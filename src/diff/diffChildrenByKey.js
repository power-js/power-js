import { createElement } from '../dom/createElement';
import { diffChildrenKeys } from './diffChildrenKeys';
import { diffChildrenText } from './diffChildrenText';
/**
 * diffing keyed lists
 * @param {Array}       oldChildren
 * @param {Array}       newChildren
 * @param {DOM Element} parentNode
 */
export const diffChildrenByKey = (oldChildren, newChildren, parentNode) => {
  // get every old key
  const oldKeys = oldChildren.map((child) => child.props.key);
  // get every new key
  const newKeys = newChildren.map((child) => child.props.key);
  // get the keys diff
  let diffedKeys = diffChildrenKeys(oldKeys, newKeys);
  // cache the diff length
  let size = diffedKeys.length;
  // if there wasn't an additional or subtraction to the children
  if (!diffedKeys.length) {
    // compare the contents of the children
    diffedKeys = diffChildrenText(oldChildren, newChildren);

    size = diffedKeys.length;

    for (let i = 0; i < size; i++) {
      // replace the node with the new node
      parentNode.replaceChild(createElement(newChildren[diffedKeys[i]]), parentNode.children[diffedKeys[i]]);
    }
  } else {
    if (diffedKeys.length && oldKeys.length === newKeys.length) {
      const size = parentNode.children.length;

      for (let i = 0; i < size; i++) {
        parentNode.replaceChild(createElement(newChildren[i]), parentNode.children[i]);
      }
    } else if (oldKeys.length > newKeys.length) {
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
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < size; i++) {
        const key = diffedKeys[i];

        for (let a = newChildren.length - 1; a >= 0; a--) {
          const node = newChildren[a];

          if (String(node.props.key) === key) {
            fragment.appendChild(createElement(node));
            break;
          }
        }

        parentNode.appendChild(fragment);
      }
    }
  }
};
