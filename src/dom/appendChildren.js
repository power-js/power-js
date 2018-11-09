import { isVNode, isArray } from '../utils/is';
import { appendElementText } from './appendElementText';
import { appendElementVnode } from './appendElementVnode';

/**
 * appends children
 * @private
 * @param {HTMLElement} element
 * @param {Array}
 */
export const appendChildren = (parent, children) => {
  for (let i = 0, k = children.length; i < k; i++) {
    const child = children[i];

    if (isVNode(child)) {
      appendElementVnode(parent, child);
      continue;
    }

    if (isArray(child)) {
      appendChildren(parent, child);
      continue;
    }

    appendElementText(parent, child);
  }
};
