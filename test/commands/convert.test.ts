import { captureOutput } from '@oclif/test';
import { expect } from 'chai';

import Convert from '../../src/commands/convert';

describe('convert', () => {
  it('bitmark convert \'[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "bitLevel": 1, "body": "Hello World" }}]\'', async () => {
    // NOTE: cannot pass JSON string as argument to runCommand as it will split it into array of strings
    const { stdout } = await captureOutput(async () => {
      return Convert.run([
        '[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "bitLevel": 1, "body": "Hello World" }}]',
      ]);
    });

    expect(stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[.article]Hello World');
  });

  // Peggy parser
  it("bitmark convert '[.article] Hello World'", async () => {
    const { stdout } = await captureOutput(async () => {
      return Convert.run(['-v', '2', '[.article] Hello World']);
    });
    expect(stdout).to.contain(
      '"bit":{"type":"article","format":"bitmark--","bitLevel":1,"item":"","lead":"","pageNumber":"","marginNumber":"","hint":"","instruction":"","body":"Hello World"}',
      // '[{"bit":{"type":"article","format":"bitmark--","body":"Hello World"},"bitmark":"[.article] Hello World"}]\n',
    );
  });

  // ANTLR parser
  it("bitmark convert --parser antlr '[.article] Hello World'", async () => {
    const { stdout } = await captureOutput(async () => {
      return Convert.run(['--parser', 'antlr', '[.article] Hello World']);
    });
    expect(stdout).to.contain('"bit":{"type":"article","format":"bitmark--","body":"Hello World"}');
  });

  // test
  //   .stdout()
  //   .command([
  //     'convert',
  //     '-v',
  //     '2',
  //     '[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "bitLevel": 1, "body": "Hello World" }}]',
  //   ])
  //   .it(
  //     'bitmark convert \'[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "bitLevel": 1, "body": "Hello World" }}]\'',
  //     (ctx) => {
  //       expect(ctx.stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[.article]Hello World');
  //     },
  //   );

  // // Peggy parser
  // test
  //   .stdout()
  //   .command(['convert', '-v', '2', '[.article] Hello World'])
  //   .it("bitmark convert '[.article] Hello World'", (ctx) => {
  //     expect(ctx.stdout).to.contain(
  //       '"bit":{"type":"article","format":"bitmark--","bitLevel":1,"item":"","lead":"","pageNumber":"","marginNumber":"","hint":"","instruction":"","body":"Hello World"}',
  //       // '[{"bit":{"type":"article","format":"bitmark--","body":"Hello World"},"bitmark":"[.article] Hello World"}]\n',
  //     );
  //   });

  // // ANTLR parser
  // test
  //   .stdout()
  //   .command(['convert', '--parser', 'antlr', '[.article] Hello World'])
  //   .it("bitmark convert '[.article] Hello World'", (ctx) => {
  //     expect(ctx.stdout).to.contain('"bit":{"type":"article","format":"bitmark--","body":"Hello World"}');
  //   });
});
