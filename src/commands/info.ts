import { BitmarkParserGenerator, InfoFormat, InfoType } from '@gmb/bitmark-parser-generator';
import { Enum } from '@ncoderz/superenum';
import { Args, Command, Flags } from '@oclif/core';
import * as fs from 'fs-extra';
import * as path from 'path';

const bitmarkTool = new BitmarkParserGenerator();

/**
 * Info command
 */
// eslint-disable-next-line arca/no-default-export
export default class Convert extends Command {
  static description = 'Display information about bitmark';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --all',
    '<%= config.bin %> <%= command.id %> list --deprecated',
    '<%= config.bin %> <%= command.id %> bit --bit=cloze',
    '<%= config.bin %> <%= command.id %> -f json -p bit --bit=still-image-film',
  ];

  static flags = {
    // General
    format: Flags.string({
      char: 'f',
      description: `output format. If not specified, the ouput will be text`,
      // helpValue: 'FORMAT',
      options: ['text', 'json'],
      default: 'text',
    }),

    bit: Flags.string({
      description: 'bit to filter. If not specified, all bits will be returned',
      required: false,
      exclusive: ['all', 'deprecated'],
    }),
    deprecated: Flags.boolean({
      description: 'output deprecated bits',
    }),
    all: Flags.boolean({
      description: 'output all bits including deprecated',
      exclusive: ['deprecated'],
    }),

    // JSON formatting
    pretty: Flags.boolean({
      helpGroup: 'JSON Formatting',
      char: 'p',
      description: 'prettify the JSON output with indent',
    }),
    indent: Flags.integer({
      helpGroup: 'JSON Formatting',
      description: 'prettify indent (default:2)',
      helpValue: 'INDENT',
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
    info: Args.string({
      description: 'information to return. If not specified, a list of bits will be returned',
      required: false,
      options: ['list', 'bit'],
      default: 'list',
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Convert);
    const { info } = args;
    const { output, format, append, pretty, indent, bit, all, deprecated } = flags;
    const prettify = pretty ? Math.max(0, indent ?? 2) : undefined;
    const outputFormat = Enum(InfoFormat).fromValue(format) ?? InfoFormat.text;
    let type = Enum(InfoType).fromValue(info) ?? InfoType.list;
    if (type === InfoType.list) {
      if (all) type = InfoType.all;
      else if (deprecated) type = InfoType.deprecated;
    }

    const res: string = bitmarkTool.info({
      type,
      bit,
      outputFormat,
      prettify,
    }) as string;

    if (output) {
      // Write JSON to file
      const flag = append ? 'a' : 'w';
      fs.ensureDirSync(path.dirname(output));
      fs.writeFileSync(output, res, {
        flag,
      });
    } else {
      console.log(res);
    }
  }
}
