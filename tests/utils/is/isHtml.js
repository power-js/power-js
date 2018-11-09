import { isHtml } from '../../../src/utils/is/isHtml';
import { h } from '../../../src/vdom/h';
import { createElement } from '../../../src/dom/createElement';

describe('utils/is/isHtml', () => {
  describe('#isHtml', () => {
    it('should validate if an HTML Element is an HTML Element', () => {
      expect(isHtml(createElement(<div />))).toBe(true);
    });

    it('should validate if an Object is not an HTML Element', () => {
      expect(isHtml({ test: 'test' })).toBe(false);
    });

    it('should validate if an Array is not an HTML Element', () => {
      expect(isHtml(['sadasd', 234234])).toBe(false);
    });

    it('should validate if a String is not an HTML Element', () => {
      expect(isHtml('Test')).toBe(false);
    });

    it('should validate if a Number is not an HTML Element', () => {
      expect(isHtml(23423)).toBe(false);
    });
  });
});
