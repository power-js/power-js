import { POWER_NODE_ATTRIBUTE } from '../constants';
import { isArray, isFunction } from '../utils/is';
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

  // handle functional components
  if(isFunction(this.tagName)){
    const results = new this.tagName(this.props);
    
    if(isArray(results)){
      this.children = this.children.concat(results);
    }else{
      this.children[this.children.length] = results;
    }
  }

  // increment counter
  counter += 1;

  // assign counter to props
  this.props[POWER_NODE_ATTRIBUTE] = counter;

  return this;
}
