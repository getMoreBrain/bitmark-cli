import { BitmarkParserGenerator, TextFormat } from '@gmb/bitmark-parser-generator';
import { Args, Command, Flags } from '@oclif/core';

import { StringUtils } from '../utils/StringUtils';

const bitmarkTool = new BitmarkParserGenerator();

/**
 * Convert Text command
 */
// eslint-disable-next-line arca/no-default-export
export default class ConvertText extends Command {
  static description = 'Convert between bitmark text formats';

  static examples = [
    "<%= config.bin %> <%= command.id %> 'Hello World'",
    '<%= config.bin %> <%= command.id %> \'[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]\'',
    '<%= config.bin %> <%= command.id %> input.json -o output.txt',
    '<%= config.bin %> <%= command.id %> input.txt -o output.json',
  ];

  static flags = {
    // General
    textFormat: Flags.string({
      char: 'f',
      description: `conversion format`,
      // helpValue: 'FORMAT',
      default: TextFormat.bitmarkText,
      options: [...TextFormat.values().filter((v) => v !== TextFormat.plainText)],
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
  };

  static args = {
    input: Args.string({
      description: 'file to read, or text or json string. If not specified, input will be from <stdin>',
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(ConvertText);
    const { input } = args;
    const { output, textFormat, append, pretty, indent } = flags;
    const prettyIndent = pretty ? Math.max(0, indent ?? 2) : undefined;

    let dataIn: string;

    if (input != undefined) {
      dataIn = input;
    } else {
      // Read from stdin
      dataIn = await this.readStream(process.stdin);
    }

    let res: string | unknown;

    // Bitmark tool text conversion
    res = await bitmarkTool.convertText(dataIn, {
      textFormat: TextFormat.fromValue(textFormat),
      outputFile: output,
      fileOptions: {
        append,
      },
      jsonOptions: {
        prettify: prettyIndent,
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
