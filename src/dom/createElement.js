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
  const fragment = document.createDocumentFragment();

  if (vnode.children && vnode.children.length) {
    appendChildren(fragment, vnode.children);
  }

  element.appendChild(fragment);

  if (vnode.props && Object.keys(vnode.props).length) {
    decorateElement(element, vnode.props);
  }

  return element;
};
