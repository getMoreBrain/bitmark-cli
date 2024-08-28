import { captureOutput } from '@oclif/test';

import Convert from '../../src/commands/convert';

(async () => {
  const chai = await import('chai');
  const { expect } = chai;

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
  });
})();
