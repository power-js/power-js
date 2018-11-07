import { isEqual } from '../utils/is';
import { decorateElement } from '../dom/decorateElement';
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

  for (const key in oldObj) {
    if (!newObj[key]) {
      // removing attribute from element
      element.removeAttribute(jsxProps[key] || key);
    }
  }

  decorateElement(element, newObj);
};
