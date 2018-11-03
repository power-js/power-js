import { extend } from '../utils/objects';
import { isEqual, isFunction, isObject } from '../utils/is';
import { DATA_COMPONENT_ATTRIBUTE } from '../constants';
import { createElement } from '../dom/createElement';
import { diff } from '../diff/diff';
import { proxy } from './proxy';

/**
 * Power Component
 * @public
 * @class   Component
 */
export class Component {
  /**
   * constructor of class Component
   * @public
   * @param {Object} props
   */
  constructor(props) {
    const construct = this.constructor;

    // Getting called before constructor
    if (this.componentWillInitialize) {
      this.componentWillInitialize(this);
    }

    // mark class as power comp
    this._power = true;

    // the component gets the name of the class name
    this.name = construct.name;

    // intial state
    this.state = isFunction(this.getInitialState) ? this.getInitialState() : isObject(construct.initialState) ? construct.initialState : {};

    // default props
    this.props = isFunction(this.getDefaultProps) ? this.getDefaultProps() : isObject(construct.defaultProps) ? construct.defaultProps : {};

    // merge defaultProps with inline props
    if (props) {
      this.props = extend({}, this.props, props);
    }

    // Getting called after constructor
    if (this.componentDidInitialize) {
      this.componentDidInitialize(this);
    }
  }

  /**
   * creates the elements of a component
   * @public
   * @return {Node}
   */
  create() {
    // creating the component root element
    this.node = document.createElement(this.name);

    this.node.setAttribute(DATA_COMPONENT_ATTRIBUTE, true);

    // get the vnode construct
    this.componentVDom = this.render();

    // convert props into proxy object
    this.props = proxy(this, this.props);

    // get the template by call the render
    this.template = createElement(this.componentVDom, this);

    this.node.appendChild(this.template);

    return this.node;
  }

  shouldComponentUpdate() {
    return true;
  }

  /**
   * Modifies the component state and triggers a re-render of the component
   * and its children with the updated state
   * @public
   * @param {*}        state          The new state Object or the state handler function
   * @param {Function} updateCallback The callback function to invoke after state has been updated
   */
  setState(state, updateCallback) {
    // prevent update when receiving same state
    if (isEqual(state, this.state)) {
      return;
    }

    let newState = state;
    // if newState is a function
    if (isFunction(newState)) {
      // pass current currentState
      newState = newState.call(this, this.state, this.props);
    }

    // merge the new state with the existing
    newState = extend({}, this.state, newState);

    // if false, drop any state changes
    if (!this.shouldComponentUpdate(this.props, newState)) {
      return false;
    }

    // apply state changes
    this.state = newState;

    // update the component
    this.update();

    if (isFunction(updateCallback)) {
      updateCallback.call(this);
    }
  }

  /**
   * Forces re-renders the component and its children
   * @public
   */
  forceUpdate(callback) {
    this.update();

    if (isFunction(callback)) {
      callback.call(this);
    }
  }

  /**
   * updates the component
   * @public
   */
  update() {
    if (this.componentWillUpdate) {
      this.componentWillUpdate(this);
    }

    const updatedComponentVDom = this.render();

    this.patch(this.componentVDom, updatedComponentVDom);

    // assign the new component vdom as the current one
    this.componentVDom = updatedComponentVDom;

    if (this.componentDidUpdate) {
      this.componentDidUpdate(this);
    }
  }

  /**
   * patch
   * @public
   */
  patch(oldVNode, newVNode) {
    diff(oldVNode, newVNode, this);
  }

  /**
   * remove component and its childs
   * @public
   */
  destroy() {
    if (this.componentWillUnmount) {
      this.componentWillUnmount(this);
    }

    this.node.parentElement.removeChild(this.node);

    if (this.componentDidUnmount) {
      this.componentDidUnmount(this);
    }
  }
}
