import { VNode } from '../../src/vdom/vnode';

describe('dom', () => {
  describe('#VNode', () => {
    it('should return a new valid VNode', () => {
      const vnode = new VNode('div', {}, []);

      expect(vnode.constructor === VNode).toBe(true);
      expect(vnode).toHaveProperty('tagName');
      expect(vnode).toHaveProperty('children');
      expect(vnode).toHaveProperty('props');
    });

    it('should return a valid VNode', () => {
      const vnode = new VNode();

      expect(vnode.tagName === 'div').toBe(true);
      expect(vnode.children.length === 0).toBe(true);
      expect(typeof vnode.props === 'object').toBe(true);
    });
  });
});
