/**
 * Determines if the passed children are keyed or not
 * @private
 * @param {Array} oldChildren
 * @param {Array} newChildren
 * @return {Boolean}
 */
export const isKeyedList = (oldChildren, newChildren) => {
  return (
    newChildren.length && newChildren[0].props && newChildren[0].props.key !== undefined ||
    oldChildren.length && oldChildren[0].props && oldChildren[0].props.key !== undefined
  );
}
