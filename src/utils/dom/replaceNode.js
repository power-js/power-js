/**
 * Replaces one child node of the specified node with another
 * @private
 * @param {HTMLElement} oldChild
 * @param {HTMLElement} newChild
 */
export const replaceNode = (oldChild, newChild) => {
  if (oldChild && newChild && oldChild.parentNode) {
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }
};
