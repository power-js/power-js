import { removeNode } from '../../../src/utils/dom';

describe('utils/dom', () => {
  describe('#removeNode', () => {
    it('should remove the node from the DOM', () => {
      const element = document.createElement('div');

      element.id = 'hello';

      document.body.appendChild(element);

      const spy = jest.spyOn(document.body, 'removeChild');

      expect(document.querySelector('#hello')).toBeDefined();

      removeNode(element);

      expect(document.querySelector('#hello')).toBeNull();

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });

    it('should not error when trying to remove a detached DOM node', () => {
      const element = document.createElement('div');

      element.id = 'hello';

      const remove = removeNode(element);

      removeNode(element);
    });
  });
});
