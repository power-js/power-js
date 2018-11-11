import { POWER_NODE_ATTRIBUTE } from '../constants';
import { isFunction } from '../utils/is';
/**
 * VNode Counter
 * @type {Number}
 */
let counter = 0;

/**
 * Creates a Virtual Node
 * @public
 * @param   {String}  tag
 * @param   {Object}  props
 * @param   {Array}   children
 * @returns {Object}
 */
export function VNode(tagName, props, children) {
  this.tagName = tagName || 'div';
  this.children = children || [];
  this.props = props || {};

  // handle classes and functional components
  if (isFunction(this.tagName)) {
    const output = new this.tagName(this.props);

    // handle class
    if (output.render) {
      return output.render();
    }
    // handle functional component
    return output;
  }

  // increment counter
  counter += 1;

  // assign counter to props
  this.props[POWER_NODE_ATTRIBUTE] = counter;

  return this;
}
