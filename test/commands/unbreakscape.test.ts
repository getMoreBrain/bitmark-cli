import { expect, test } from '@oclif/test';

describe('unbreakscape', () => {
  test
    .stdout()
    .command(['unbreakscape', '[^.article^] Hello World'])
    .it("bitmark unbreakscape '[^.article^] Hello World'", (ctx) => {
      expect(ctx.stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[.article] Hello World');
    });
});
