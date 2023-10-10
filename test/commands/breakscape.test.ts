import { expect, test } from '@oclif/test';

describe('breakscape', () => {
  test
    .stdout()
    .command(['breakscape', '[.article] Hello World'])
    .it("bitmark breakscape '[.article] Hello World'", (ctx) => {
      expect(ctx.stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[^.article] Hello World');
    });
});
