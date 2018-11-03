import { DATA_NODE_ATTRIBUTE } from '../constants';
import { isEvent, isString, isVNode, isEqual } from '../utils/is';
import { createElement } from '../dom/createElement';
import { updateElementStyles } from '../dom/updateElementStyles';
import { removeNode } from '../utils/dom/removeNode';
import { jsxProps } from './jsxProps';

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

/**
 * checks out the difference between 2 objects
 * and merges it into the component element
 * @private
 * @param {Object}      oldObj
 * @param {Object}      newObj
 * @param {HTMLElement} element
 */
export const propsDiff = (oldObj, newObj, element) => {
  // prevent unneeded iterations
  if (isEqual(oldObj, newObj)) {
    return;
  }

  if (!isEqual(oldObj.style, newObj.style)) {
    // update styling
    updateElementStyles(element, newObj.style, oldObj.style);
  }

  for (const key in oldObj) {
    if (!newObj[key]) {
      // removing attribute from element
      element.removeAttribute(jsxProps[key] || key);
    }
  }

  for (const key in newObj) {
    if (key !== 'style' && !isEvent(key)) {
      // check if there a new key
      if (!oldObj[key] || newObj[key] !== oldObj[key]) {
        // add attribute to element
        element.setAttribute(jsxProps[key] || key, newObj[key]);
      }
    }
  }
};

/**
 * checks out the difference between 2 Arrays
 * and merges it into the component element
 * @private
 * @param {Array}       oldChildren
 * @param {Array}       newChildren
 * @param {HTMLElement} element
 * @param {Class}       Component
 */
export const childrenDiff = (oldChildren, newChildren, element, Component) => {
  for (let i = 0, k = newChildren.length; i < k; i++) {
    const child = newChildren[i];

    if (oldChildren[i] === undefined && isVNode(child)) {
      if (!child.props) {
        child.props = {};
      }

      const newElement = createElement(child, Component);

      element.appendChild(newElement);

      continue;
    }

    if (isString(child) && child !== oldChildren[i]) {
      const childText = document.createTextNode(child);
      element.replaceChild(childText, element.childNodes[i]);

      continue;
    }

    if (isVNode(child)) {
      diff(oldChildren[i], child, Component);

      continue;
    }

    if (child.pop && oldChildren[i] && oldChildren[i].pop) {
      childrenDiff(oldChildren[i], child, element, Component);
    }
  }

  let childLengthDiff = oldChildren.length - newChildren.length;
  let childLength = oldChildren.length - 1;

  while (childLengthDiff > 0) {
    removeNode(Component.node.querySelector(`[${DATA_NODE_ATTRIBUTE}="${oldChildren[childLength].props[DATA_NODE_ATTRIBUTE]}"]`));
    childLength -= 1;
    childLengthDiff -= 1;
  }
};
