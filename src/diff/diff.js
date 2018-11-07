import { propsDiff } from './propsDiff';
import { childrenDiff } from './childrenDiff';
import { DATA_NODE_ATTRIBUTE } from '../constants';
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
  const powerId = oldVNode.props[DATA_NODE_ATTRIBUTE];

  // check if newVNode props is null
  if (newVNode.props === null) {
    newVNode.props = {};
  }

  // merge the node id
  newVNode.props[DATA_NODE_ATTRIBUTE] = oldVNode.props[DATA_NODE_ATTRIBUTE];

  // get the dom element to the vnode
  const element = Component.node.querySelector(`[${DATA_NODE_ATTRIBUTE}="${powerId}"]`);
  const newChildren = newVNode.children;
  const oldChildren = oldVNode.children;
  // compare props
  propsDiff(oldVNode.props, newVNode.props, element);

  // compare children
  if (isKeyedList(oldChildren, newChildren)) {
    keyChildrenDiff(oldChildren, newChildren, element, Component);
  } else {
    childrenDiff(oldChildren, newChildren, element, Component);
  }
};
