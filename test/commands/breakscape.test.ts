import { captureOutput } from '@oclif/test';

import Breakscape from '../../src/commands/breakscape';

(async () => {
  const chai = await import('chai');
  const { expect } = chai;

  describe('breakscape', () => {
    it('[.article] Hello World', async () => {
      const { stdout } = await captureOutput(async () => {
        return Breakscape.run(['[.article] Hello World']);
      });
      expect(stdout.replace(new RegExp('[\\n]', 'g'), '')).to.equal('[^.article^] Hello World');
    });
  });
})();
