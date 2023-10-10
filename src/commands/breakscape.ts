import { BitmarkParserGenerator } from '@gmb/bitmark-parser-generator';
import { Args, Command, Flags } from '@oclif/core';

const bitmarkTool = new BitmarkParserGenerator();

/**
 * Breakscape command
 */
// eslint-disable-next-line arca/no-default-export
export default class Breakscape extends Command {
  static description = 'Breakscape text';

  static examples = [
    "<%= config.bin %> <%= command.id %> '[.article] Hello World'",
    '<%= config.bin %> <%= command.id %> input.txt -o output.txt',
  ];

  static flags = {
    // General

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
      description: 'file to read, or text. If not specified, input will be from <stdin>',
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Breakscape);
    const { input } = args;
    const { output, append } = flags;

    let dataIn: string;

    if (input != undefined) {
      dataIn = input;
    } else {
      // Read from stdin
      dataIn = await this.readStream(process.stdin);
    }

    // Bitmark tool text conversion
    const res = await bitmarkTool.breakscapeText(dataIn, {
      outputFile: output,
      fileOptions: {
        append,
      },
    });

    if (!output) {
      console.log(res);
    }
  }

  private async readStream(stream: NodeJS.ReadStream): Promise<string> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) chunks.push(chunk as Uint8Array);
    return Buffer.concat(chunks).toString('utf8');
  }
}
