import { propsDiff } from './propsDiff';
import { childrenDiff } from './childrenDiff';
import { POWER_NODE_ATTRIBUTE } from '../constants';
import { keyChildrenDiff } from './keyChildrenDiff';
import { isKeyedList } from '../utils/is';

/**
 * working on difference between 2 vnodes
 * @private
 * @param {Object}  oldVNode
 * @param {Object}  newVNode
 * @param {Class}   Component
 */
export const diff = (oldVNode, newVNode, Component) => {
  // get the element id
  const powerId = oldVNode.props[POWER_NODE_ATTRIBUTE];

  // check if newVNode props is null
  if (newVNode.props === null) {
    newVNode.props = {};
  }

  // merge the node id
  newVNode.props[POWER_NODE_ATTRIBUTE] = powerId;

  // get the dom element to the vnode
  const element = Component.node.querySelector(`[${POWER_NODE_ATTRIBUTE}="${powerId}"]`);
  const newChildren = newVNode.children;
  const oldChildren = oldVNode.children;

  // compare children
  if (isKeyedList(oldChildren, newChildren)) {
    keyChildrenDiff(oldChildren, newChildren, element);
  } else {
    childrenDiff(oldChildren, newChildren, element, Component);
  }

  // compare props
  propsDiff(oldVNode.props, newVNode.props, element);
};
