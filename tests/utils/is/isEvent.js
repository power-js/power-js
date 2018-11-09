import { isEvent } from '../../../src/utils/is/isEvent';

describe('utils/is/isEvent', () => {
  describe('#isEvent', () => {
    it('should validate if click is an event', () => {
      expect(isEvent('click')).toBe(true);
    });

    it('should validate if onclick is an event', () => {
      expect(isEvent('onclick')).toBe(true);
    });

    it('should validate if isclick is not an event', () => {
      expect(isEvent('isclick')).toBe(false);
    });

    it('should validate if onfail is not an event', () => {
      expect(isEvent('onfail')).toBe(false);
    });
  });
});
