import { replaceNode } from '../../../src/utils/dom/replaceNode';

describe('utils/dom', () => {
  describe('#replaceNode', () => {
    it('should replace a child with another node in the DOM', () => {
      const element = document.createElement('div');
      element.id = 'hello';
      document.body.appendChild(element);

      const element2 = document.createElement('div');
      element2.id = 'hello2';

      expect(document.querySelector('#hello')).toBeDefined();

      replaceNode(element, element2);

      expect(document.querySelector('#hello')).toBeNull();
      expect(document.querySelector('#hello2')).toBeDefined();
    });

    it('should not error when the newChild is invalid', () => {
      const element = document.createElement('div');
      element.id = 'hello';
      document.body.appendChild(element);

      const element2 = document.createElement('div');
      element2.id = 'hello2';

      expect(document.querySelector('#hello')).toBeDefined();

      replaceNode(element, null);

      expect(document.querySelector('#hello')).toBeDefined();
    });
  });
});
