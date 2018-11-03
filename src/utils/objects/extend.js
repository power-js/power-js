/**
 * Shallow copies all properties from the config object to the target object
 * @param  {Object} target    The receiving object you want to apply the source objects to
 * @param  {Object} arguments The source object(s) containing the new or updated properties
 * @return {Object}           The target object
 */
export const extend = function(target) {
  const sources = [].slice.call(arguments, 1);

  for (let i = 0, k = sources.length; i < k; i++) {
    const props = sources[i];

    for (const prop in props) {
      target[prop] = props[prop];
    }
  }

  return target;
};
