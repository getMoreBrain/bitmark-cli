import { Args, Command, Flags } from '@oclif/core';
import { BitmarkTool, Output } from 'bitmark-generator';
import { StringUtils } from '../utils/StringUtils';

const bitmarkTool = new BitmarkTool();

export default class Convert extends Command {
  static description = 'Convert between bitmark formats';

  static examples = [
    "<%= config.bin %> <%= command.id %> '[.article] Hello World'",
    '<%= config.bin %> <%= command.id %> \'[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "body": "Hello World" }}]\'',
  ];

  static flags = {
    // General
    output: Flags.file({
      char: 'o',
      description: 'output file. If not specified, output will be to <stdout>',
      helpValue: 'FILE',
    }),
    format: Flags.string({
      char: 'f',
      description:
        'output format. If not specified, bitmark is converted to JSON, and JSON / AST is converted to bitmark',
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

    // Bitmark formatting
    explicitTextFormat: Flags.boolean({
      description: 'Include bitmark text format in bitmark even if it is the default value',
      helpGroup: 'Bitmark Formatting',
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
    const { output, format, append, pretty, indent, explicitTextFormat } = flags;
    const prettyIndent = pretty ? Math.max(0, indent) : undefined;
    const outputFormat = Output.fromValue(format);

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
      output,
      outputFormat,
      fileOptions: {
        append,
      },
      jsonOptions: {
        prettify: prettyIndent,
      },
      bitmarkOptions: {
        explicitTextFormat,
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
