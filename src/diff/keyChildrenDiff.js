import { createElement } from '../dom/createElement';

const diffChildrenKeys = (first, second) => {
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
/**
 * diffing keyed lists
 * @param {Array}       oldChildren
 * @param {Array}       newChildren
 * @param {DOM Element} parentNode
 */
export const keyChildrenDiff = (oldChildren, newChildren, parentNode) => {
  // get every old key
  const oldKeys = oldChildren.map((child) => child.props.key);
  // get every new key
  const newKeys = newChildren.map((child) => child.props.key);

  if (oldKeys.length === newKeys.length) {
    const size = parentNode.children.length;

    for (let i = 0; i < size; i++) {
      parentNode.replaceChild(createElement(newChildren[i]), parentNode.children[i]);
    }
  } else {
    // get the keys diff
    const diffedKeys = diffChildrenKeys(oldKeys, newKeys);
    // cache the diff length
    const size = diffedKeys.length;

    if (oldKeys.length > newKeys.length) {
      for (let i = 0; i < size; i++) {
        const key = diffedKeys[i];

        for (let a = 0, b = parentNode.children.length; a < b; a++) {
          const node = parentNode.children[a];

          if (node && node.attributes.key.value === key) {
            parentNode.removeChild(node);
            break;
          }
        }
      }
    } else if (oldKeys.length < newKeys.length) {
      for (let i = 0; i < size; i++) {
        const key = diffedKeys[i];

        for (let a = newChildren.length - 1; a >= 0; a--) {
          const node = newChildren[a];

          if (String(node.props.key) === key) {
            parentNode.appendChild(createElement(node));
            break;
          }
        }
      }
    }
  }
};
