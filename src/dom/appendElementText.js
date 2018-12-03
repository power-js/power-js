/**
 * append Element string
 * @private
 * @param {HTMLElement} parentNode
 * @param {String}      text
 */
export const appendElementText = (parentNode, text) => {
  parentNode.appendChild(document.createTextNode(text));
};
