import { isEqual } from '../../../src/utils/is/isEqual';

describe('utils/is/isEqual', () => {
  describe('#isEqual', () => {
    it('should determine if the objects are equal (false)', () => {
      const obj1 = {
        hello: 'world'
      };

      const obj2 = {
        hellow: 'world'
      };

      expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should determine if the objects are equal (true)', () => {
      const obj1 = {
        hello: 'world'
      };

      const obj2 = obj1;

      expect(isEqual(obj1, obj2)).toBe(true);
    });
  });
});
