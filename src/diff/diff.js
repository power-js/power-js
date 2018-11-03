import { propsDiff } from './propsDiff';
import { childrenDiff } from './childrenDiff';
import { DATA_NODE_ATTRIBUTE } from '../constants';

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

  // compare the tag
  if (oldVNode.tagName !== newVNode.tagName) {
    console.log('tagName changed');
  }

  // compare props
  propsDiff(oldVNode.props, newVNode.props, element);

  // compare children
  childrenDiff(oldVNode.children, newVNode.children, element, Component);
};
