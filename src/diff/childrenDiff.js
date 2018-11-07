import { isString, isVNode } from '../utils/is';
import { createElement } from '../dom/createElement';
import { removeNode } from '../utils/dom/removeNode';
import { POWER_NODE_ATTRIBUTE } from '../constants';
import { diff } from './diff';

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
    removeNode(Component.node.querySelector(`[${POWER_NODE_ATTRIBUTE}="${oldChildren[childLength].props[POWER_NODE_ATTRIBUTE]}"]`));
    childLength -= 1;
    childLengthDiff -= 1;
  }
};
