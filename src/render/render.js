import { isHtml, isVNode, isFunction } from '../utils/is';
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

  // handle a class being passed in
  if (!isVNode(model) && !model._power) {
    return render(new model(), _root);
  }

  // check if model is a component
  if (model._power && model.componentWillMount) {
    model.componentWillMount(model);
  }

  // convert the vnodes or component into real dom elements
  const domTree = model.create();

  if (isHtml(domTree)) {
    _root.appendChild(domTree);
  }

  if (model._power && model.componentDidMount) {
    model.componentDidMount(model);
  }

  return model;
};
