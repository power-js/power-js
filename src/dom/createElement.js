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

  if (vnode.props && Object.keys(vnode.props).length) {
    decorateElement(element, vnode.props);
  }

  if (vnode.children && vnode.children.length) {
    appendChildren(element, vnode.children);
  }

  return element;
};
