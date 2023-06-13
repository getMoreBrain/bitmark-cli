import { BitmarkParserGenerator } from '@getmorebrain/bitmark-parser-generator';
import { Hook } from '@oclif/core';

const bitmarkTool = new BitmarkParserGenerator();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hook: Hook<'init'> = async function (opts: any) {
  const versionString = `Bitmark CLI v${opts.config.version} (bitmark-parser-generator v${bitmarkTool.version()})`;

  // Override any 'version' command
  if (['-v', '-V', '--version', 'version'].includes(process.argv[2])) {
    console.log(versionString);
    return process.exit(0);
  }

  // Override the 'userAgent' which is printed in the help.
  opts.config.userAgent = versionString;
};

// eslint-disable-next-line arca/no-default-export
export default hook;
