import { createElement } from '../dom/createElement';
/**
 * diffing keyed lists
 * @param {Array}       oldChilds
 * @param {Array}       newChilds
 * @param {DOM Element} parent
 */
export const keyChildrenDiff = (oldChilds, newChilds, parent, Component) => {
  // get every old key
  const oldKeys = oldChilds.map((child) => child.props.key);
  // get every new key
  const newKeys = newChilds.map((child) => child.props.key);

  if (oldKeys.length > newKeys.length) {
    const differenceKeys = oldKeys.filter((key) => newKeys.indexOf(key) < 0);

    if(differenceKeys.length === 1){
      const element = parent.querySelector(`[key="${differenceKeys[0]}"]`);
      parent.removeChild(element);
    }else{
      let keys = '';

      for (let i = 0, k = differenceKeys.length; i < k; i++) {
        keys += `[key="${differenceKeys[i]}"],`
      }

      parent.querySelectorAll(keys.slice(0, keys.length - 1)).forEach((child) => child.parentNode.removeChild(child));
    }
  } else if (oldKeys.length < newKeys.length) {
    const differenceKeys = newKeys.filter((key) => oldKeys.indexOf(key) < 0);

    differenceKeys.forEach((key) => {
      newChilds.forEach((child) => {
        if (child.props.key === key) {
          parent.appendChild(createElement(child));
        }
      });
    });
  }
};
