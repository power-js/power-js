import { DATA_NODE_ATTRIBUTE } from '../constants';

/**
 * VNode Counter
 * @type {Number}
 */
let _counter = 0;

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

  _counter += 1;

  this.props[DATA_NODE_ATTRIBUTE] = _counter;

  return this;
}
