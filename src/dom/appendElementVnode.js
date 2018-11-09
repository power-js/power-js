import { createElement } from './createElement';

/**
 * appends a vnode
 * @private
 * @param {HTMLElement} element
 * @param {Object} vnode
 * @param {Class} Component
 */
export const appendElementVnode = (parent, vnode) => {
  parent.appendChild(createElement(vnode));
};
