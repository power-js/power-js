import { addEventListener } from './addEventListener';
import { updateElementStyles } from './updateElementStyles';
import { isElementAttribute, isEqual, isEvent } from '../utils/is';
import { jsxProps } from '../vdom/jsxProps';

/**
 * Iterates over the passed props and assigns any attributes and/or binds
 * events to the specified element
 * @private
 * @param {HTMLElement} element
 * @param {Object}      nextProps
 * @param {object}      prevProps
 */
export const decorateElement = (element, nextProps, prevProps) => {
  if (prevProps) {
    for (const prop in prevProps) {
      if (!nextProps[prop]) {
        if (isEvent(prop) && element.$events[prop]) {
          element.removeEventListener(prop, element.$events[prop]);
        } else {
          element.removeAttribute(jsxProps[prop] || prop);
        }
      }
    }
  }

  for (const prop in nextProps) {
    if (prop === 'style' && !isEqual(element.style, nextProps.style)) {
      updateElementStyles(element, nextProps[prop]);
      continue;
    }

    if (isEvent(prop)) {
      addEventListener(element, prop, nextProps[prop]);
      continue;
    }

    if (isElementAttribute(element, prop) || prop === 'key') {
      if (!element[prop] || nextProps[prop] !== element[prop]) {
        element.setAttribute(jsxProps[prop] || prop, nextProps[prop]);
      }
    }
  }
};
