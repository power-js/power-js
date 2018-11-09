/**
 * Determines whether the passed object is a valid HTML Element
 * @private
 * @param {Object} obj Object to check
 * @return {Boolean} Returns true if the passed object is an element, else false
 */
export const isHtml = (obj) => obj instanceof Element;
