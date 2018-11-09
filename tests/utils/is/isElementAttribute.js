import { isElementAttribute } from '../../../src/utils/is/isElementAttribute';
import { h } from '../../../src/vdom/h';
import { createElement } from '../../../src/dom/createElement';

describe('utils/is/isElementAttribute', () => {
  describe('#isElementAttribute', () => {
    it('should validate if data-test is an HTML Element Attribute', () => {
      const element = createElement(<div data-test="test" />);

      expect(isElementAttribute(element, 'data-test')).toBe(true);
    });

    it('should validate if test-test is not HTML Element Attribute', () => {
      const element = createElement(<div test-test="test" />);

      expect(isElementAttribute(element, 'test-test')).toBe(false);
    });
  });
});
