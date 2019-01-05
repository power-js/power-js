/**
 * @param {Array} first
 * @param {Array} second
 * @return {Array}
 */
export const diffChildrenKeys = (first, second) => {
  const keys = [];
  const diff = [];
  const firstSize = first.length;
  const secondSize = second.length;

  for (let i = 0; i < firstSize; i++) {
    keys[first[i]] = true;
  }

  for (let i = 0; i < secondSize; i++) {
    if (keys[second[i]]) {
      delete keys[second[i]];
    } else {
      keys[second[i]] = true;
    }
  }

  for (const key in keys) {
    diff[diff.length] = key;
  }

  return diff;
}
