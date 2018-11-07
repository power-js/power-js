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

    differenceKeys.forEach((diff) => {
      const element = parent.querySelector(`[key="${diff}"]`);

      if(element.parentNode){
        element.parentNode.removeChild(element);
      }
    });
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
