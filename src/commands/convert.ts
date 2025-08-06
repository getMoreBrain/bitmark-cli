import { Args, Command, Flags } from '@oclif/core';
import { parse as antlrParse } from 'bitmark-grammar';
import * as fs from 'fs-extra';
import * as path from 'path';

import { StringUtils } from '../utils/StringUtils';

import {
  BitmarkParserGenerator,
  BitmarkParserType,
  BitmarkVersion,
  CardSetVersion,
  Output,
} from '@gmb/bitmark-parser-generator';

const bitmarkTool = new BitmarkParserGenerator();

/**
 * Convert command
 */
// eslint-disable-next-line arca/no-default-export
export default class Convert extends Command {
  static description = 'Convert between bitmark formats';

  static examples = [
    "<%= config.bin %> <%= command.id %> '[.article] Hello World'",
    '<%= config.bin %> <%= command.id %> \'[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark++", "body": "Hello World" }}]\'',
    '<%= config.bin %> <%= command.id %> input.json -o output.bitmark',
    '<%= config.bin %> <%= command.id %> input.bitmark -o output.json',
    '<%= config.bin %> <%= command.id %> -f ast input.json -o output.ast.json',
  ];

  static flags = {
    // General
    version: Flags.integer({
      char: 'v',
      description: 'version of bitmark to use (default: latest)',
      options: [...Object.values(BitmarkVersion).map((v) => `${v}`)], // Must convert integer to string for options
      // default: 1,
    }),
    format: Flags.string({
      char: 'f',
      description: `output format. If not specified, bitmark is converted to JSON, and JSON / AST is converted to bitmark`,
      // helpValue: 'FORMAT',
      options: [...Object.values(Output)],
    }),
    warnings: Flags.boolean({
      char: 'w',
      description: 'enable warnings in the output',
    }),

    // JSON formatting
    pretty: Flags.boolean({
      char: 'p',
      description: 'prettify the JSON output with indent',
      helpGroup: 'JSON Formatting',
    }),
    indent: Flags.integer({
      description: 'prettify indent (default:2)',
      helpValue: 'INDENT',
      helpGroup: 'JSON Formatting',
      dependsOn: ['pretty'],
    }),
    plainText: Flags.boolean({
      description: 'output text as plain text rather than JSON (default: set by bitmark version)',
      helpGroup: 'JSON Formatting',
    }),
    excludeUnknownProperties: Flags.boolean({
      description: 'exclude unknown properties in the JSON output',
      helpGroup: 'JSON Formatting',
    }),

    // Bitmark formatting
    explicitTextFormat: Flags.boolean({
      description: 'include bitmark text format in bitmark even if it is the default (bitmark++)',
      helpGroup: 'Bitmark Formatting',
    }),
    spacesAroundValues: Flags.integer({
      description: 'number of spaces around values in bitmark (default: 1)',
      helpGroup: 'Bitmark Formatting',
    }),
    cardSetVersion: Flags.integer({
      description: 'version of card set to use in bitmark (default: set by bitmark version)',
      helpGroup: 'Bitmark Formatting',
      options: [...Object.values(CardSetVersion).map((v) => `${v}`)], // Must convert integer to string for options
      // default: 1,
    }),

    // File output
    output: Flags.file({
      helpGroup: 'File output',
      char: 'o',
      description: 'output file. If not specified, output will be to <stdout>',
      helpValue: 'FILE',
    }),
    append: Flags.boolean({
      helpGroup: 'File output',
      char: 'a',
      description: 'append to the output file (default is to overwrite)',
      dependsOn: ['output'],
    }),

    // Parser
    parser: Flags.string({
      description: `parser to use`,
      helpGroup: 'Parser Options',
      options: [...Object.values(BitmarkParserType), 'antlr'],
      default: BitmarkParserType.peggy,
    }),
  };

  static args = {
    input: Args.string({
      description: 'file to read, or bitmark or json string. If not specified, input will be from <stdin>',
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Convert);
    const { input } = args;
    const {
      version,
      output,
      format,
      append,
      warnings,
      pretty,
      indent,
      plainText,
      excludeUnknownProperties,
      explicitTextFormat,
      spacesAroundValues: spacesAroundValuesIn,
      cardSetVersion,
      parser,
    } = flags;
    const prettyIndent = pretty ? Math.max(0, indent ?? 2) : undefined;
    const spacesAroundValues = spacesAroundValuesIn != null ? Math.max(0, spacesAroundValuesIn ?? 1) : undefined;
    const outputFormat = Output.fromValue(format);
    const bitmarkParserType = parser === 'antlr' ? 'antlr' : BitmarkParserType.fromValue(parser);

    let dataIn: string;

    if (input != undefined) {
      dataIn = input;
    } else {
      // Read from stdin
      dataIn = await this.readStream(process.stdin);
    }

    let res: string | unknown;

    if (bitmarkParserType === 'antlr') {
      // Antlr parser
      const jsonStr = antlrParse(dataIn);
      res = JSON.parse(jsonStr);

      if (output) {
        const jsonPrettyStr = JSON.stringify(res, null, prettyIndent);

        // Write JSON to file
        const flag = append ? 'a' : 'w';
        fs.ensureDirSync(path.dirname(output));
        fs.writeFileSync(output, jsonPrettyStr, {
          flag,
        });
      }
    } else {
      // Bitmark tool conversion (Peggy parser)
      res = bitmarkTool.convert(dataIn, {
        bitmarkVersion: BitmarkVersion.fromValue(version),
        bitmarkParserType,
        outputFile: output,
        outputFormat,
        fileOptions: {
          append,
        },
        jsonOptions: {
          enableWarnings: warnings,
          prettify: prettyIndent,
          textAsPlainText: plainText ?? undefined, // undefined means use default
          excludeUnknownProperties: excludeUnknownProperties,
        },
        bitmarkOptions: {
          explicitTextFormat,
          spacesAroundValues,
          cardSetVersion: CardSetVersion.fromValue(cardSetVersion),
        },
      });
    }

    if (!output) {
      try {
        if (!StringUtils.isString(res)) {
          res = JSON.stringify(res, null, prettyIndent);
        }
      } catch (e) {
        // Ignore
      }

      console.log(res);
    }
  }

  private async readStream(stream: NodeJS.ReadStream): Promise<string> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) chunks.push(chunk as Uint8Array);
    return Buffer.concat(chunks).toString('utf8');
  }
}
