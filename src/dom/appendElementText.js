/**
 * append Element string
 * @private
 * @param {HTMLElement} element
 * @param {String}      text
 */
export const appendElementText = (element, text) => {
  element.appendChild(document.createTextNode(text));
};
