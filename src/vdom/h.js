import { VNode } from './vnode';
import { isBoolean, isNumber, isFunction, isVNode } from '../utils/is';

/**
 * Array used to sanitize child nodes
 * @type {Array}
 */
const stack = [];

/**
 * FOR DEMO OF ISSUE - REMOVE
 * @type {Boolean}
 */
let initial = true;

/**
 * Returns a new virtual node
 * @param  {String} tagName String containing the elements tag name (i.e. 'div', 'span')
 * @param  {Object} props   Object containing any attributes defined on the element
 * @param  {Array}  args    Array of child nodes
 * @return {Object}         A new virtual node
 */
export function h(tagName, props) {
  const children = [];

  // if we already have a vnode just return it
  if (isVNode(tagName)) {
    return tagName;
  }

  // handle classes and functional components
  if (isFunction(tagName)) {
    const output = new tagName(props);
    // if we have a valid vnode return it
    if (isVNode(tagName)) {
      return tagName;
    }

    // handle class
    if (output.render) {
      // NEED TO FIX THIS
      // if the initial render is done with a JSX tag this breaks the props chain
      if (!initial) {
        // output nodes
        return output.render();
      }

      initial = false;
    }

    return output;
  }

  for (let i = arguments.length; i-- > 2;) {
    stack[stack.length] = arguments[i];
  }

  while (stack.length) {
    let child = stack.pop();

    if (child && child.pop) {
      for (let i = child.length; i--;) {
        stack[stack.length] = child[i];
      }
    } else {
      if (isBoolean(child)) {
        child = null;
      }

      if (isNumber(child)) {
        child = String(child);
      }

      if (!isFunction(child)) {
        if (child === null || child === undefined) {
          child = '';
        }
      }

      children[children.length] = child;
    }
  }

  return new VNode(tagName, props, children);
}
