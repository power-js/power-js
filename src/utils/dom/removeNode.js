/**
 * Removes a child node from the DOM
 * @private
 * @param {HTMLElement}
 */
export const removeNode = (node) => {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
};
