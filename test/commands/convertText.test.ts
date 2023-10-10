import { expect, test } from '@oclif/test';

describe('convertText', () => {
  test
    .stdout()
    .command(['convertText', '[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]'])
    .it(
      'bitmark convertText \'[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]\'',
      (ctx) => {
        expect(ctx.stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('Hello World');
      },
    );

  test
    .stdout()
    .command(['convertText', 'Hello World'])
    .it("bitmark convertText 'Hello World'", (ctx) => {
      expect(ctx.stdout).to.contain(
        '[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]',
      );
    });
});
