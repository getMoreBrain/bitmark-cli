import { Args, Command, Flags } from '@oclif/core';

import { StringUtils } from '../utils/StringUtils';

import {
  BitmarkParserGenerator,
  BitmarkParserType,
  BitmarkVersion,
  CardSetVersion,
  Output,
} from '@getmorebrain/bitmark-parser-generator';

const bitmarkTool = new BitmarkParserGenerator();

/**
 * Convert command
 */
// eslint-disable-next-line arca/no-default-export
export default class Convert extends Command {
  static description = 'Convert between bitmark formats';

  static examples = [
    "<%= config.bin %> <%= command.id %> '[.article] Hello World'",
    '<%= config.bin %> <%= command.id %> \'[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "body": "Hello World" }}]\'',
    '<%= config.bin %> <%= command.id %> input.json -o output.bit',
    '<%= config.bin %> <%= command.id %> input.bit -o output.json',
    '<%= config.bin %> <%= command.id %> -f ast input.json -o output.ast.json',
  ];

  static flags = {
    // General
    version: Flags.integer({
      char: 'v',
      description: 'version of bitmark to use (default: latest)',
      helpGroup: 'Bitmark Formatting',
      options: [...Object.values(BitmarkVersion).map((v) => `${v}`)], // Must convert integer to string for options
      // default: 1,
    }),
    output: Flags.file({
      char: 'o',
      description: 'output file. If not specified, output will be to <stdout>',
      helpValue: 'FILE',
    }),
    format: Flags.string({
      char: 'f',
      description: `output format. If not specified, bitmark is converted to JSON, and JSON / AST is converted to bitmark`,
      // helpValue: 'FORMAT',
      options: [...Object.values(Output)],
    }),
    append: Flags.boolean({
      char: 'a',
      description: 'append to the output file (default is to overwrite)',
      dependsOn: ['output'],
    }),

    // JSON formatting
    pretty: Flags.boolean({
      char: 'p',
      description: 'prettify the JSON output with indent',
      helpGroup: 'JSON Formatting',
    }),
    indent: Flags.integer({
      description: 'prettify indent',
      helpValue: 'INDENT',
      helpGroup: 'JSON Formatting',
      default: 2,
    }),
    plainText: Flags.boolean({
      description: 'output text as plain text rather than JSON (default: set by bitmark version)',
      helpGroup: 'JSON Formatting',
    }),
    extraProperties: Flags.boolean({
      description: 'include extra (unknown) properties in the JSON output',
      helpGroup: 'JSON Formatting',
    }),

    // Bitmark formatting
    explicitTextFormat: Flags.boolean({
      description: 'include bitmark text format in bitmark even if it is the default (bitmark--)',
      helpGroup: 'Bitmark Formatting',
    }),
    cardSetVersion: Flags.integer({
      description: 'version of card set to use in bitmark (default: set by bitmark version)',
      helpGroup: 'Bitmark Formatting',
      options: [...Object.values(CardSetVersion).map((v) => `${v}`)], // Must convert integer to string for options
      // default: 1,
    }),

    // Parser
    parser: Flags.string({
      description: `parser to use`,
      helpGroup: 'Parser Options',
      options: [...Object.values(BitmarkParserType)],
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
      pretty,
      indent,
      plainText,
      extraProperties,
      explicitTextFormat,
      cardSetVersion,
      parser,
    } = flags;
    const prettyIndent = pretty ? Math.max(0, indent) : undefined;
    const outputFormat = Output.fromValue(format);
    const bitmarkParserType = BitmarkParserType.fromValue(parser);

    let dataIn: string;

    if (input != undefined) {
      dataIn = input;
    } else {
      // Read from stdin
      dataIn = await this.readStream(process.stdin);
    }

    // const name = flags.name ?? 'world';
    // this.log(`hello ${name} from /Users/sewell/dev/getMoreBrain/git/bitmark-cli/src/commands/convert.ts`);
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`);
    // }

    // const json = `[.cloze]
    // [%cl1]

    // I am coffee toast[_cloze][_gap text][?1 or 2][!verb]`;

    let res = await bitmarkTool.convert(dataIn, {
      bitmarkVersion: BitmarkVersion.fromValue(version),
      bitmarkParserType,
      outputFile: output,
      outputFormat,
      fileOptions: {
        append,
      },
      jsonOptions: {
        prettify: prettyIndent,
        textAsPlainText: plainText ?? undefined, // undefined means use default
        includeExtraProperties: extraProperties,
      },
      bitmarkOptions: {
        explicitTextFormat,
        cardSetVersion: CardSetVersion.fromValue(cardSetVersion),
      },
    });

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
