import { startsWith } from '../../../src/utils/strings/startsWith';

describe('utils/strings', () => {
  describe('#startsWith', () => {
    it('should determine if the passed string starts with "on" (true)', () => {
      const event = 'onClick';

      expect(startsWith(event, 'on')).toBe(true);
    });

    it('should determine if the passed string starts with "on" (false)', () => {
      const event = 'Click';

      expect(startsWith(event, 'on')).toBe(false);
    });

    it('should determine if the passed string has "on"', () => {
      const event = 'Clonick';

      expect(startsWith(event, 'on', 2)).toBe(true);
    });
  });
});
