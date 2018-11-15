import { POWER_NODE_ATTRIBUTE } from '../constants';

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

  // increment counter
  counter += 1;

  // assign counter to props
  this.props[POWER_NODE_ATTRIBUTE] = counter;

  return this;
}
