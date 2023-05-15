import { Hook } from '@oclif/core';
import { BitmarkParserGenerator } from '@getmorebrain/bitmark-parser-generator';

const bitmarkTool = new BitmarkParserGenerator();

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

export default hook;
