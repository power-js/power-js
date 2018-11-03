/**
 * Determines whether a string begins with the characters of a specified string, returning true or false.
 * @private
 * @param  {String} text     The text string that will be searched
 * @param  {String} search   The characters to be searched for at the start of this string
 * @param  {Number} position The position in the text to begin searching - defaults to 0 (optional)
 * @return {Boolean}         True if the given characters are found at the beginning of the string; otherwise, false
 */
export const startsWith = (text, search, position) => {
  return text.substr(!position || position < 0 ? 0 : +position, search.length) === search;
};

export default startsWith;
