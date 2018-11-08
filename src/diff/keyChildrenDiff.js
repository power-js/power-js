import { createElement } from '../dom/createElement';

const diffChildrenKeys = function(first, second){
  const a = [];
  const diff = [];

  for (let i = 0, k = first.length; i < k; i++) {
    a[first[i]] = true;
  }

  for (let i = 0, k = second.length; i < k; i++) {
    if (a[second[i]]) {
      delete a[second[i]];
    } else {
      a[second[i]] = true;
    }
  }

  for (const k in a) {
    diff[diff.length] = k
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
  // get the diff on keys
  const diffedKeys = diffChildrenKeys(oldKeys, newKeys);

  if (oldKeys.length > newKeys.length) {
    for (let i = 0, k = diffedKeys.length; i < k; i++) {
      const key = diffedKeys[i];

      for(var a = 0, b = parentNode.children.length; a < b; a++){
        const node = parentNode.children[a];

        if(node && node.attributes.key.value === key){
          parentNode.removeChild(node);
          break;
        }
      }
    }
  } else if (oldKeys.length < newKeys.length) {
    for (let i = 0, k = diffedKeys.length; i < k; i++) {
      const key = diffedKeys[i];

      for (var a = newChildren.length - 1; a >= 0; a--){
        const node = newChildren[a];

        if (String(node.props.key) === key) {
          parentNode.appendChild(createElement(node));
          break;
        }
      }
    }
  }
};
