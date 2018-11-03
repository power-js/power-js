/**
 * Performs a deep comparison between two values to determine if they are equivalent
 * @private
 * @param  {*} x     The value to compare
 * @param  {*} y     The other value to compare
 * @return {Boolean} Returns true if the values are equivalent, else false.
 */
export const isEqual = (x, y) => JSON.stringify(x) === JSON.stringify(y);
