import { VNode } from './vnode';

/**
 * Array used to sanitize child nodes
 * @type {Array}
 */
const stack = [];

/**
 * Returns a new virtual node
 * @param  {String} tagName String containing the elements tag name (i.e. 'div', 'span')
 * @param  {Object} props   Object containing any attributes defined on the element
 * @param  {Array}  args    Array of child nodes
 * @return {Object}         A new virtual node
 */
export function h(tagName, props) {
  const children = [];

  for (let i = arguments.length; i-- > 2; ) {
    stack[stack.length] = arguments[i];
  }

  while (stack.length) {
    let child = stack.pop();

    if (child && child.pop) {
      for (let i = child.length; i--; ) {
        stack[stack.length] = child[i];
      }
    } else {
      if (typeof child === 'boolean') {
        child = null;
      }

      if (typeof child === 'number') {
        child = String(child);
      }

      if (typeof child !== 'function') {
        if (child === null || child === undefined) {
          child = '';
        }
      }

      children[children.length] = child;
    }
  }

  return new VNode(tagName, props, children);
}
