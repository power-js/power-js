/**
 * class2type dictionary
 * @private
 * @type {Object}
 */
const class2type = {};

/**
 * Returns the internal JavaScript [Class]] of an object
 * @private
 * @param {Object} obj Object to check the class property of
 * @return {String} Only the class property of the object
 */
const typeOf = (obj) => (obj === null ? String(obj) : class2type[{}.toString.call(obj)]);

/**
 * Object containing our "is" methods
 * @private
 * @type {Object}
 */
const methods = {};

/**
 * Creates type checks methods: isArray(), isBoolean(), isFunction(), and more.
 * @private
 * @param {Object} obj Object to check the class property of
 * @return {Boolean} Returns true if the passed object passes the type check, else false
 */
['Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'RegExp', 'String', 'Undefined'].forEach((type) => {
  const lcase = type.toLowerCase();
  // populate class2type object with type
  class2type['[object '+ type + ']'] = lcase;
  // create isType method
  methods['is' + type] = (obj) => typeOf(obj) === lcase;
});

export const { isArray, isBoolean, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isUndefined } = methods;
