import { isHtml, isVNode, isFunction } from '../utils/is';
import { createElement } from '../dom/createElement';

/**
 * Renders a component or vnodes in the given root
 * @public
 * @param {Object|Function} model
 * @param {DOM Element}     root
 */
export const render = (model, root) => {
  // JSX will transform Component into functions
  if (isFunction(model.tagName)) {
    // TODO: better checking
    return render(new model.tagName(model.props), root);
  }

  // check if a root is given
  if (!isHtml(root)) {
    throw 'You MUST provide a valid DOM element as your root.';
  }

  // check if model is neither a vdom or component
  if (!isVNode(model) && !model._power) {
    return render(new model(), root);
  }

  // check if model is a component
  if (model._power && model.componentWillMount) {
    model.componentWillMount(model);
  }

  // convert the vnodes / component into real dom elements
  const domTree = model._power ? model.create() : createElement(model);

  if (isHtml(domTree)) {
    root.appendChild(domTree);
  }

  if (model._power && model.componentDidMount) {
    model.componentDidMount(model);
  }
};
