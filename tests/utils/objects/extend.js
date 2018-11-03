import { extend } from '../../../src/utils/objects';

describe('utils/objects', () => {
  describe('#extend', () => {
    it('should extend an object', () => {
      const targetObject = {
        one: 1,
        two: 2
      };

      const config = {
        two: 3,
        three: 2
      };

      const obj = extend(targetObject, config);

      expect(obj).toEqual({
        one: 1,
        two: 3,
        three: 2
      });
    });
  });
});
