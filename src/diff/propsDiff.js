import { isEvent, isEqual } from '../utils/is';
import { updateElementStyles } from '../dom/updateElementStyles';
import { jsxProps } from '../vdom/jsxProps';

/**
 * checks out the difference between 2 objects
 * and merges it into the component element
 * @private
 * @param {Object}      oldObj
 * @param {Object}      newObj
 * @param {HTMLElement} element
 */
export const propsDiff = (oldObj, newObj, element) => {
  // prevent unneeded iterations
  if (isEqual(oldObj, newObj)) {
    return;
  }

  if (!isEqual(oldObj.style, newObj.style)) {
    // update styling
    updateElementStyles(element, newObj.style, oldObj.style);
  }

  for (const key in oldObj) {
    if (!newObj[key]) {
      // removing attribute from element
      element.removeAttribute(jsxProps[key] || key);
    }
  }

  for (const key in newObj) {
    if (key !== 'style' && !isEvent(key)) {
      // check if there a new key
      if (!oldObj[key] || newObj[key] !== oldObj[key]) {
        // add attribute to element
        element.setAttribute(jsxProps[key] || key, newObj[key]);
      }
    }
  }
};
