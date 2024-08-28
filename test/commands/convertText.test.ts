import { captureOutput } from '@oclif/test';
import { expect } from 'chai';

import ConvertText from '../../src/commands/convertText';

describe('convertText', () => {
  it('bitmark convertText \'[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]\'', async () => {
    const { stdout } = await captureOutput(async () => {
      return ConvertText.run(['[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]']);
    });
    expect(stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('Hello World');
  });

  it("bitmark convertText 'Hello World'", async () => {
    const { stdout } = await captureOutput(async () => {
      return ConvertText.run(['Hello World']);
    });
    expect(stdout).to.contain('[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]');
  });

  //   test
  //   .stdout()
  //   .command(['convertText', '[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]'])
  //   .it(
  //     'bitmark convertText \'[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]\'',
  //     (ctx) => {
  //       expect(ctx.stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('Hello World');
  //     },
  //   );

  // test
  //   .stdout()
  //   .command(['convertText', 'Hello World'])
  //   .it("bitmark convertText 'Hello World'", (ctx) => {
  //     expect(ctx.stdout).to.contain(
  //       '[{"type":"paragraph","content":[{"text":"Hello World","type":"text"}],"attrs":{}}]',
  //     );
  //   });
});
