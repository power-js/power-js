import { isHtml } from '../utils/is';

/**
 * Renders a component or vnodes in the given root
 * @public
 * @param {Object|Function} model
 * @param {DOM Element}     root
 */
export const render = (model, root) => {
  // assign document.body if no root is given
  const rootElement = root || document.body;

  if (model.componentWillMount) {
    model.componentWillMount(model);
  }

  const html = model.create();

  if (isHtml(html)) {
    rootElement.appendChild(html);
  }

  if (model.componentDidMount) {
    model.componentDidMount(model);
  }

  return model;
};
