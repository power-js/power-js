import { diffProps } from './diffProps';
import { diffChildren } from './diffChildren';
import { diffChildrenByKey } from './diffChildrenByKey';
import { isKeyedList } from '../utils/is';
import { POWER_NODE_ATTRIBUTE } from '../constants';

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
    diffChildrenByKey(oldChildren, newChildren, element);
  } else {
    diffChildren(oldChildren, newChildren, element, Component);
  }

  // compare props
  diffProps(oldVNode.props, newVNode.props, element);
};
