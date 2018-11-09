import { createElement } from '../../src/dom/createElement';
import { h } from '../../src/vdom/h';
import { VNode } from '../../src/vdom/vnode';

describe('dom', () => {
  describe('#createElement', () => {
    it('should create a new element from the vnode', () => {
      const vnode = new VNode('div', { hello: 'world' }, [<span>hello world</span>]);

      const element = createElement(vnode);

      expect(element.children.length).toEqual(1);
      expect(element.children[0].textContent).toEqual('hello world');
      expect(element.children[0].tagName).toEqual('SPAN');
      expect(element.nodeType).toEqual(1);
      expect(element.tagName).toEqual('DIV');

      const element2 = createElement({ tagName: 'div', props: null, children: [] });
      expect(element2.children.length).toEqual(0);
      expect(element2.nodeType).toEqual(1);
      expect(element2.tagName).toEqual('DIV');
    });
  });
});
