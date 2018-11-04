import { isHtml, isVNode, isFunction } from '../utils/is';
import { createElement } from '../dom/createElement';

/**
 * Renders a component or vnodes in the given root
 * @public
 * @param {Object|Function} model
 * @param {DOM Element}     root
 */
export const render = (model, root) => {
  // assign document.body if no root is given
  const _root = root || document.body;
  // JSX will transform Component into functions
  if (isFunction(model.tagName)) {
    // TODO: better checking
    return render(new model.tagName(model.props), _root);
  }

  // check if model is neither a vdom or component
  if (!isVNode(model) && !model._power) {
    return render(new model(), _root);
  }

  // check if model is a component
  if (model._power && model.componentWillMount) {
    model.componentWillMount(model);
  }

  // convert the vnodes / component into real dom elements
  const domTree = model._power ? model.create() : createElement(model);

  if (isHtml(domTree)) {
    _root.appendChild(domTree);
  }

  if (model._power && model.componentDidMount) {
    model.componentDidMount(model);
  }
};
