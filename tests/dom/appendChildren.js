import { appendChildren } from '../../src/dom/appendChildren';
import { h } from '../../src/vdom/h';
import { VNode } from '../../src/vdom/vnode';

describe('dom', () => {
  describe('#appendChildren', () => {
    it('should handled a mixed set of children', () => {
      const element = document.createElement('div');
      const children = [new VNode('div', {}, []), <span>hi</span>, [<span>hello</span>, <div>world</div>], 12];

      appendChildren(element, children);

      expect(element.children.length).toEqual(4);
      expect(element.children[2].tagName).toEqual('SPAN');
      expect(element.children[3].tagName).toEqual('DIV');
    });
  });
});
