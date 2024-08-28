import { captureOutput } from '@oclif/test';

import Unbreakscape from '../../src/commands/unbreakscape';

(async () => {
  const chai = await import('chai');
  const { expect } = chai;

  describe('unbreakscape', () => {
    it("bitmark unbreakscape '[^.article^] Hello World'", async () => {
      const { stdout } = await captureOutput(async () => {
        return Unbreakscape.run(['[^.article^] Hello World']);
      });
      expect(stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[.article] Hello World');
    });
  });
})();
