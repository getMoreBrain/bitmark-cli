import { expect, test } from '@oclif/test';

describe('convert', () => {
  test
    .stdout()
    .command([
      'convert',
      '-v',
      '2',
      '[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "bitLevel": 1, "body": "Hello World" }}]',
    ])
    .it(
      'bitmark convert \'[{"bitmark": "[.article] Hello World","bit": { "type": "article", "format": "bitmark--", "bitLevel": 1, "body": "Hello World" }}]\'',
      (ctx) => {
        expect(ctx.stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[.article]Hello World');
      },
    );

  // Peggy parser
  test
    .stdout()
    .command(['convert', '-v', '2', '[.article] Hello World'])
    .it("bitmark convert '[.article] Hello World'", (ctx) => {
      expect(ctx.stdout).to.contain(
        '"bit":{"type":"article","format":"bitmark--","bitLevel":1,"item":"","lead":"","pageNumber":"","marginNumber":"","hint":"","instruction":"","body":"Hello World"}',
        // '[{"bit":{"type":"article","format":"bitmark--","body":"Hello World"},"bitmark":"[.article] Hello World"}]\n',
      );
    });

  // ANTLR parser
  test
    .stdout()
    .command(['convert', '--parser', 'antlr', '[.article] Hello World'])
    .it("bitmark convert '[.article] Hello World'", (ctx) => {
      expect(ctx.stdout).to.contain('"bit":{"type":"article","format":"bitmark--","body":"Hello World"}');
    });
});
