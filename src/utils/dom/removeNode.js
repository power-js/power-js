/**
 * Removes a child node from the DOM
 * @private
 * @param {HTMLElement}
 */
export const removeNode = (child) => {
  if (child && child.parentNode) {
    child.parentNode.removeChild(child);
  }
};
