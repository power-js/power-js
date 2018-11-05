import { addEventListener } from './addEventListener';
import { updateElementStyles } from './updateElementStyles';
import { isElementAttribute, isEvent } from '../utils/is';
import { jsxProps } from '../vdom/jsxProps';

/**
 * Iterates over the passed props and assigns any attributes and/or binds
 * events to the specified element
 * @private
 * @param {HTMLElement} element
 * @param {Object}      elementProps
 */
export const decorateElement = (element, props) => {
  for (const prop in props) {
    if (prop === 'style') {
      updateElementStyles(element, props[prop]);
      continue;
    }

    if (isEvent(prop)) {
      addEventListener(element, prop, props[prop]);
      continue;
    }

    if (isElementAttribute(element, prop) || prop === 'key') {
      element.setAttribute(jsxProps[prop] || prop, props[prop]);
      continue;
    }
  }
};
