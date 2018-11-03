import { startsWith } from '../strings';

/**
 * Determines whether the passed object is a valid element attribute
 * @private
 * @param {HTMLElement} element DOM Element to check the property against
 * @param {String} attribute String containing the property name to lookup
 * @return {Boolean} Returns true if the passed attribute exists inside the element
 */
export const isElementAttribute = (element, attribute) => attribute in element || attribute === 'class' || startsWith(attribute, 'data-') || startsWith(attribute, 'power-');
