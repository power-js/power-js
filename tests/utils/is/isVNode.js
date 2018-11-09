import { isVNode } from '../../../src/utils/is/isVNode';
import { h } from '../../../src/vdom/h';

describe('utils/is/isVNode', () => {
  describe('#isVNode', () => {
    it('should validate the passed object is a vnode', () => {
      expect(isVNode(h('div'))).toBe(true);
    });

    it('should validate the passed object is NOT a vnode (string)', () => {
      expect(isVNode('div')).toBe(false);
    });

    it('should validate the passed object is NOT a vnode (object)', () => {
      expect(isVNode({})).toBe(false);
    });
  });
});
