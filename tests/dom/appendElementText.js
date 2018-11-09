import { appendElementText } from '../../src/dom/appendElementText';

describe('dom', () => {
  describe('#appendElementText', () => {
    it('should append the text element to parent', () => {
      const element = document.createElement('div');

      document.body.appendChild(element);

      expect(element.textContent).toEqual('');

      appendElementText(element, 'hello world');

      expect(element.textContent).toEqual('hello world');
      expect(element.childNodes[0].nodeType).toEqual(3);
    });
  });
});
