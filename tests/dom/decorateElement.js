import { decorateElement } from '../../src/dom/decorateElement';

describe('dom', () => {
  describe('#decorateElement', () => {
    it('should decorate the element based on the prop typeof', () => {
      const element = document.createElement('div');
      const onClick = function() {};
      const props = {
        style: {
          fontWeight: 'bold'
        },
        onClick,
        className: 'hello'
      };

      decorateElement(element, props);

      expect(element.style.cssText).toEqual('font-weight: bold;');
      expect(element.className).toEqual('hello');
    });
  });
});
