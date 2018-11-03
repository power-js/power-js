import { isEqual, isString, isObject } from '../utils/is';

/**
 * Adds/removes style properties on a nodes style attribute
 * @private
 * @param {HTMLElement} element
 * @param {*}           newStyles  String or Object containing the CSS values to set
 * @param {*}           prevStyles String or Object containing the CSS values to remove
 */
export const updateElementStyles = (element, newStyles, prevStyles) => {
  if (isEqual(newStyles, prevStyles)) {
    return;
  }

  if (isString(newStyles)) {
    element.style.cssText = newStyles;
  }

  if (isObject(newStyles)) {
    if (isObject(prevStyles)) {
      for (const prop in prevStyles) {
        if (!(prop in newStyles)) {
          element.style[prop] = '';
        }
      }
    }

    for (const prop in newStyles) {
      element.style[prop] = newStyles[prop];
    }
  }
};
