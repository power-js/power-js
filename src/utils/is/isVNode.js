import { VNode } from '../../vdom/vnode';

/**
 * Determines wheter the passed object is a vnode
 * @private
 * @param {Object} vnode
 * @return {Boolean}
 */
export const isVNode = (vnode) => vnode && vnode.constructor === VNode;
