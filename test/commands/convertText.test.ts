import { captureOutput } from '@oclif/test';

import ConvertText from '../../src/commands/convertText';

(async () => {
  const chai = await import('chai');
  const { expect } = chai;

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
  });
})();
