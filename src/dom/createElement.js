import { isObject } from '../utils/is';
import { decorateElement } from './decorateElement';
import { appendChildren } from './appendChildren';

/**
 * converts a vnode into an html element
 * @private
 * @param   {Object}        vnode
 * param    {Class}         Component
 * @returns {HTMLElement}
 */
export const createElement = (vnode) => {
  // create the element
  const element = document.createElement(vnode.tagName.name || vnode.tagName);

  if (isObject(vnode.props)) {
    decorateElement(element, vnode.props);
  }

  if (vnode.children && vnode.children.length) {
    appendChildren(element, vnode.children);
  }

  return element;
};
