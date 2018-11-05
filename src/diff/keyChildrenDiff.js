import { DATA_NODE_ATTRIBUTE } from '../constants';
/**
 * diffing keyed lists
 * @param {Array}       oldChilds
 * @param {Array}       newChilds
 * @param {DOM Element} element
 */
export const keyChildrenDiff = (oldChilds, newChilds, element, Component) => {
  const oldKeys = oldChilds.map(a => a.props.key);//[DATA_NODE_ATTRIBUTE]);
  const newKeys = newChilds.map(a => a.props.key);//[DATA_NODE_ATTRIBUTE]);
    // oldChilds.forEach()
  console.log(oldKeys, newKeys, element, Component);
};
