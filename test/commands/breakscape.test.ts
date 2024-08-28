import { captureOutput } from '@oclif/test';
import { expect } from 'chai';

import Breakscape from '../../src/commands/breakscape';

describe('breakscape', () => {
  it('[.article] Hello World', async () => {
    const { stdout } = await captureOutput(async () => {
      return Breakscape.run(['[.article] Hello World']);
    });
    expect(stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[^.article^] Hello World');
  });
  // .stdout()
  // .command(['breakscape', '[.article] Hello World'])
  // .it("bitmark breakscape '[.article] Hello World'", (ctx) => {});
});
