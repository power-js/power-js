import { createElement } from './createElement';

/**
 * appends a vnode
 * @private
 * @param {HTMLElement} parentNode
 * @param {Object}      vnode
 */
export const appendElementVnode = (parentNode, vnode) => {
  parentNode.appendChild(createElement(vnode));
};
