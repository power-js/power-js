import { isEqual } from '../utils/is';
import { decorateElement } from '../dom/decorateElement';

/**
 * checks out the difference between 2 objects
 * and merges it into the component element
 * @private
 * @param {Object}      prevProps
 * @param {Object}      nextProps
 * @param {HTMLElement} element
 */
export const propsDiff = (prevProps, nextProps, element) => {
  // prevent unneeded iterations
  if (isEqual(prevProps, nextProps)) {
    return;
  }

  decorateElement(element, nextProps, prevProps);
};
