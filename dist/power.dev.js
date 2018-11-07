(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.power = {})));
}(this, (function (exports) { 'use strict';

  /**
   * Data power attribute
   * @private
   * @type {String}
   */
  var POWER_COMPONENT_ATTRIBUTE = 'power-component';
  /**
   * data node id
   * @private
   * @type {String}
   */

  var POWER_NODE_ATTRIBUTE = 'power-id';

  /**
   * VNode Counter
   * @type {Number}
   */

  var counter = 0;
  /**
   * Creates a Virtual Node
   * @public
   * @param   {String}  tag
   * @param   {Object}  props
   * @param   {Array}   children
   * @returns {Object}
   */

  function VNode(tagName, props, children) {
    this.tagName = tagName || 'div';
    this.children = children || [];
    this.props = props || {}; // increment counter

    counter += 1; // assign counter to props

    this.props[POWER_NODE_ATTRIBUTE] = counter;
    return this;
  }

  /**
   * stack // TODO better description
   * @type {Array}
   */

  var stack = [];
  /**
   * Returns a new virtual node
   * @param  {String} tagName String containing the elements tag name (i.e. 'div', 'span')
   * @param  {Object} props   Object containing any attributes defined on the element
   * @param  {Array}  args    Array of child nodes
   * @return {Object}         A new virtual node
   */

  function h(tagName, props) {
    var children = [];

    for (var i = arguments.length; i-- > 2;) {
      stack[stack.length] = arguments[i];
    }

    while (stack.length) {
      var child = stack.pop();

      if (child.pop) {
        for (var _i = child.length; _i--;) {
          stack[stack.length] = child[_i];
        }
      } else {
        if (typeof child === 'boolean') {
          child = null;
        }

        if (typeof child === 'number') {
          child = String(child);
        }

        if (typeof child !== 'function') {
          if (child === null) {
            child = '';
          }
        }

        children[children.length] = child;
      }
    }

    return new VNode(tagName, props, children);
  }

  /**
   * Determines whether a string begins with the characters of a specified string, returning true or false.
   * @private
   * @param  {String} text     The text string that will be searched
   * @param  {String} search   The characters to be searched for at the start of this string
   * @param  {Number} position The position in the text to begin searching - defaults to 0 (optional)
   * @return {Boolean}         True if the given characters are found at the beginning of the string; otherwise, false
   */
  var startsWith = function startsWith(text, search, position) {
    return text.substr(!position || position < 0 ? 0 : +position, search.length) === search;
  };

  /**
   * Determines whether the passed object is a valid element attribute
   * @private
   * @param {HTMLElement} element DOM Element to check the property against
   * @param {String} attribute String containing the property name to lookup
   * @return {Boolean} Returns true if the passed attribute exists inside the element
   */

  var isElementAttribute = function isElementAttribute(element, attribute) {
    return attribute in element || attribute === 'class' || startsWith(attribute, 'data-') || startsWith(attribute, 'power-');
  };

  /**
   * Performs a deep comparison between two values to determine if they are equivalent
   * @private
   * @param  {*} x     The value to compare
   * @param  {*} y     The other value to compare
   * @return {Boolean} Returns true if the values are equivalent, else false.
   */
  var isEqual = function isEqual(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
  };

  /**
   * Determines whether the passed string is a valid event
   * @private
   * @param {String} event String containing the event
   * @return {Boolean} Returns true if the passed string is an event, else false
   */

  var isEvent = function isEvent(event) {
    return (startsWith(event, 'on') ? event.toLowerCase() : "on".concat(event)) in window;
  };

  /**
   * Determines whether the passed object is a valid HTML Element
   * @private
   * @param {Object} obj Object to check
   * @return {Boolean} Returns true if the passed object is an element, else false
   */
  var isHtml = function isHtml(obj) {
    return obj instanceof Element;
  };

  /**
   * Determines if the passed children are keyed or not
   * @private
   * @param {Array} oldChildren
   * @param {Array} newChildren
   * @return {Boolean}
   */
  var isKeyedList = function isKeyedList(oldChildren, newChildren) {
    return newChildren.length && newChildren[0].props && newChildren[0].props.key || oldChildren.length && oldChildren[0].props && oldChildren[0].props.key;
  };

  /**
   * Determines wheter the passed object is a vnode
   * @private
   * @param {Object} vnode
   * @return {Boolean}
   */

  var isVNode = function isVNode(vnode) {
    return vnode && vnode.constructor === VNode;
  };

  /**
   * class2type dictionary
   * @private
   * @type {Object}
   */
  var class2type = {};
  /**
   * Returns the internal JavaScript [Class]] of an object
   * @private
   * @param {Object} obj Object to check the class property of
   * @return {String} Only the class property of the object
   */

  var typeOf = function typeOf(obj) {
    return obj === null ? String(obj) : class2type[{}.toString.call(obj)];
  };
  /**
   * Object containing our "is" methods
   * @private
   * @type {Object}
   */


  var methods = {};
  /**
   * Creates type checks methods: isArray(), isBoolean(), isFunction(), and more.
   * @private
   * @param {Object} obj Object to check the class property of
   * @return {Boolean} Returns true if the passed object passes the type check, else false
   */

  ['Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'RegExp', 'String', 'Undefined'].forEach(function (type) {
    var lcase = type.toLowerCase(); // populate class2type object with type

    class2type["[object ".concat(type, "]")] = lcase; // create isType method

    methods["is".concat(type)] = function (obj) {
      return typeOf(obj) === lcase;
    };
  });
  var isArray = methods.isArray,
      isFunction = methods.isFunction,
      isObject = methods.isObject,
      isString = methods.isString;

  /**
   * Renders a component or vnodes in the given root
   * @public
   * @param {Object|Function} model
   * @param {DOM Element}     root
   */

  var render = function render(model, root) {
    // assign document.body if no root is given
    var _root = root || document.body; // JSX will transform Component into functions


    if (isFunction(model.tagName)) {
      // TODO: better checking
      return render(new model.tagName(model.props), _root);
    } // handle a class being passed in


    if (!isVNode(model) && !model._power) {
      return render(new model(), _root);
    } // check if model is a component


    if (model._power && model.componentWillMount) {
      model.componentWillMount(model);
    } // convert the vnodes / component into real dom elements


    var domTree = model.create();

    if (isHtml(domTree)) {
      _root.appendChild(domTree);
    }

    if (model._power && model.componentDidMount) {
      model.componentDidMount(model);
    }

    return model;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Shallow copies all properties from the config object to the target object
   * @param  {Object} target    The receiving object you want to apply the source objects to
   * @param  {Object} arguments The source object(s) containing the new or updated properties
   * @return {Object}           The target object
   */
  var extend = function extend(target) {
    var sources = [].slice.call(arguments, 1);

    for (var i = 0, k = sources.length; i < k; i++) {
      var props = sources[i];

      for (var prop in props) {
        target[prop] = props[prop];
      }
    }

    return target;
  };

  /**
   * Assigns a callback function to the event type on the specificed element that
   * will be called whenever the event is triggered
   * @private
   * @param {HTMLElement} element
   * @param {Event}       event
   * @param {Function}    handler
   */
  var addEventListener = function addEventListener(element, event, handler) {
    var eventType = event.startsWith('on') ? event.substring(2, event.length).toLowerCase() : event; // invoke the callback function in the context of the DOM element

    element.addEventListener(eventType, function (e) {
      return handler.call(element, e, element);
    });
  };

  /**
   * Adds/removes style properties on a nodes style attribute
   * @private
   * @param {HTMLElement} element
   * @param {*}           newStyles  String or Object containing the CSS values to set
   * @param {*}           prevStyles String or Object containing the CSS values to remove
   */

  var updateElementStyles = function updateElementStyles(element, newStyles, prevStyles) {
    if (isEqual(newStyles, prevStyles)) {
      return;
    }

    if (isString(newStyles)) {
      element.style.cssText = newStyles;
    }

    if (isObject(newStyles)) {
      if (isObject(prevStyles)) {
        for (var prop in prevStyles) {
          if (!(prop in newStyles)) {
            element.style[prop] = '';
          }
        }
      }

      for (var _prop in newStyles) {
        element.style[_prop] = newStyles[_prop];
      }
    }
  };

  /**
   * JSX Special Properties
   */
  var jsxProps = {
    htmlFor: 'for',
    className: 'class'
  };

  /**
   * Iterates over the passed props and assigns any attributes and/or binds
   * events to the specified element
   * @private
   * @param {HTMLElement} element
   * @param {Object}      elementProps
   */

  var decorateElement = function decorateElement(element, props) {
    for (var prop in props) {
      if (prop === 'style') {
        if (!isEqual(element.style, props.style)) {
          updateElementStyles(element, props[prop]);
        }

        continue;
      }

      if (isEvent(prop)) {
        addEventListener(element, prop, props[prop]);
        continue;
      }

      if (isElementAttribute(element, prop) || prop === 'key') {
        if (!element[prop] || props[prop] !== element[prop]) {
          element.setAttribute(jsxProps[prop] || prop, props[prop]);
        }
      }
    }
  };

  /**
   * append Element string
   * @private
   * @param {HTMLElement} element
   * @param {String}      text
   */
  var appendElementText = function appendElementText(element, text) {
    element.appendChild(document.createTextNode(text));
  };

  /**
   * appends a vnode
   * @private
   * @param {HTMLElement} element
   * @param {Object} vnode
   * @param {Class} Component
   */

  var appendElementVnode = function appendElementVnode(parent, vnode) {
    parent.appendChild(createElement(vnode));
  };

  /**
   * appends children
   * @private
   * @param {HTMLElement} element
   * @param {Array}
   */

  var appendChildren = function appendChildren(parent, children) {
    for (var i = 0, k = children.length; i < k; i++) {
      var child = children[i];

      if (isVNode(child)) {
        appendElementVnode(parent, child);
        continue;
      }

      if (isArray(child)) {
        appendChildren(parent, child);
        continue;
      }

      appendElementText(parent, child);
    }
  };

  /**
   * converts a vnode into an html element
   * @private
   * @param   {Object}        vnode
   * param    {Class}         Component
   * @returns {HTMLElement}
   */

  var createElement = function createElement(vnode) {
    // create the element
    var element = document.createElement(vnode.tagName.name || vnode.tagName);
    var fragment = document.createDocumentFragment();

    if (vnode.children && vnode.children.length) {
      appendChildren(fragment, vnode.children);
    }

    element.appendChild(fragment);

    if (vnode.props && Object.keys(vnode.props).length) {
      decorateElement(element, vnode.props);
    }

    return element;
  };

  /**
   * checks out the difference between 2 objects
   * and merges it into the component element
   * @private
   * @param {Object}      oldObj
   * @param {Object}      newObj
   * @param {HTMLElement} element
   */

  var propsDiff = function propsDiff(oldObj, newObj, element) {
    // prevent unneeded iterations
    if (isEqual(oldObj, newObj)) {
      return;
    }

    for (var key in oldObj) {
      if (!newObj[key]) {
        // removing attribute from element
        element.removeAttribute(jsxProps[key] || key);
      }
    }

    decorateElement(element, newObj);
  };

  /**
   * Removes a child node from the DOM
   * @private
   * @param {HTMLElement}
   */
  var removeNode = function removeNode(child) {
    if (child && child.parentNode) {
      child.parentNode.removeChild(child);
    }
  };

  /**
   * Replaces one child node of the specified node with another
   * @private
   * @param {HTMLElement} oldChild
   * @param {HTMLElement} newChild
   */

  /**
   * checks out the difference between 2 Arrays
   * and merges it into the component element
   * @private
   * @param {Array}       oldChildren
   * @param {Array}       newChildren
   * @param {HTMLElement} element
   * @param {Class}       Component
   */

  var childrenDiff = function childrenDiff(oldChildren, newChildren, element, Component) {
    for (var i = 0, k = newChildren.length; i < k; i++) {
      var child = newChildren[i];

      if (oldChildren[i] === undefined && isVNode(child)) {
        if (!child.props) {
          child.props = {};
        }

        var newElement = createElement(child, Component);
        element.appendChild(newElement);
        continue;
      }

      if (isString(child) && child !== oldChildren[i]) {
        var childText = document.createTextNode(child);
        element.replaceChild(childText, element.childNodes[i]);
        continue;
      }

      if (isVNode(child)) {
        diff(oldChildren[i], child, Component);
        continue;
      }

      if (child.pop && oldChildren[i] && oldChildren[i].pop) {
        childrenDiff(oldChildren[i], child, element, Component);
      }
    }

    var childLengthDiff = oldChildren.length - newChildren.length;
    var childLength = oldChildren.length - 1;

    while (childLengthDiff > 0) {
      removeNode(Component.node.querySelector("[".concat(POWER_NODE_ATTRIBUTE, "=\"").concat(oldChildren[childLength].props[POWER_NODE_ATTRIBUTE], "\"]")));
      childLength -= 1;
      childLengthDiff -= 1;
    }
  };

  /**
   * diffing keyed lists
   * @param {Array}       oldChilds
   * @param {Array}       newChilds
   * @param {DOM Element} parent
   */

  var keyChildrenDiff = function keyChildrenDiff(oldChilds, newChilds, parent) {
    // get every old key
    var oldKeys = oldChilds.map(function (child) {
      return child.props.key;
    }); // get every new key

    var newKeys = newChilds.map(function (child) {
      return child.props.key;
    });

    if (oldKeys.length > newKeys.length) {
      var differenceKeys = oldKeys.filter(function (key) {
        return newKeys.indexOf(key) < 0;
      });
      differenceKeys.forEach(function (diff) {
        var element = parent.querySelector("[key=\"".concat(diff, "\"]"));

        if (parent) {
          parent.removeChild(element);
        }
      });
    } else if (oldKeys.length < newKeys.length) {
      var _differenceKeys = newKeys.filter(function (key) {
        return oldKeys.indexOf(key) < 0;
      });

      _differenceKeys.forEach(function (key) {
        newChilds.forEach(function (child) {
          if (child.props.key === key) {
            parent.appendChild(createElement(child));
          }
        });
      });
    }
  };

  /**
   * working on difference between 2 vnodes
   * @private
   * @param {Object}  oldVNode
   * @param {Object}  newVNode
   * @param {Class}   Component
   */

  var diff = function diff(oldVNode, newVNode, Component) {
    // get the element id
    var powerId = oldVNode.props[POWER_NODE_ATTRIBUTE]; // check if newVNode props is null

    if (newVNode.props === null) {
      newVNode.props = {};
    } // merge the node id


    newVNode.props[POWER_NODE_ATTRIBUTE] = powerId; // get the dom element to the vnode

    var element = Component.node.querySelector("[".concat(POWER_NODE_ATTRIBUTE, "=\"").concat(powerId, "\"]"));
    var newChildren = newVNode.children;
    var oldChildren = oldVNode.children; // compare props

    propsDiff(oldVNode.props, newVNode.props, element); // compare children

    if (isKeyedList(oldChildren, newChildren)) {
      keyChildrenDiff(oldChildren, newChildren, element);
    } else {
      childrenDiff(oldChildren, newChildren, element, Component);
    }
  };

  var ARRAY_MODIFIERS = ['push', 'pop', 'shift', 'unshift', 'splice'];
  /**
   * Wraps our prop/state objects to we can control writes and/or detect prop modifications specifically with Arrays
   * @param   {Class}   Component
   * @param   {Object}  source
   * @param   {Boolean} isStateObject
   * @return  {Proxy}
   */

  var proxy = function proxy(component, source) {
    var handler = {
      get: function get(target, prop) {
        var value = target[prop];
        var arrayHandler = {
          get: function get(target, prop) {
            var value = target[prop];

            if (isFunction(value)) {
              if (isArray(target)) {
                // allow operation through
                return function () {
                  var array = Array.prototype[prop].apply(target, arguments);

                  if (ARRAY_MODIFIERS.includes(prop)) {
                    if (component.shouldComponentUpdate(component.props, component.state)) {
                      component.update();
                    }
                  }

                  return array;
                };
              }
            }

            return value;
          }
        };

        if (isArray(value)) {
          return new Proxy(value, arrayHandler);
        }

        return value;
      },
      set: function set(target, prop, value) {
        var currentValue = target[prop];

        if (!component.shouldComponentUpdate(target, component.state)) {
          return true;
        }

        if (currentValue !== value) {
          // set value
          target[prop] = value; // update component

          component.update();
        } // return true to indicate that assignment succeeded


        return true;
      }
    };
    return new Proxy(source, handler);
  };

  /**
   * Power Component
   * @public
   * @class   Component
   */

  var Component =
  /*#__PURE__*/
  function () {
    /**
     * constructor of class Component
     * @public
     * @param {Object} props
     */
    function Component(props) {
      _classCallCheck(this, Component);

      var construct = this.constructor; // Getting called before constructor

      if (this.componentWillInitialize) {
        this.componentWillInitialize(this);
      } // mark class as power comp


      this._power = true; // the component gets the name of the class name

      this.name = construct.name; // intial state

      this.state = isFunction(this.getInitialState) ? this.getInitialState() : isObject(construct.initialState) ? construct.initialState : {}; // default props

      this.props = isFunction(this.getDefaultProps) ? this.getDefaultProps() : isObject(construct.defaultProps) ? construct.defaultProps : {}; // merge defaultProps with inline props

      if (props) {
        this.props = extend({}, this.props, props);
      } // Getting called after constructor


      if (this.componentDidInitialize) {
        this.componentDidInitialize(this);
      }
    }
    /**
     * creates the elements of a component
     * @public
     * @return {Node}
     */


    _createClass(Component, [{
      key: "create",
      value: function create() {
        // creating the component root element
        this.node = document.createElement(this.name);
        this.node.setAttribute(POWER_COMPONENT_ATTRIBUTE, true); // get the vnode construct

        this.componentVDom = this.render(); // convert props into proxy object

        this.props = proxy(this, this.props); // get the template by call the render

        this.template = createElement(this.componentVDom, this);
        this.node.appendChild(this.template);
        return this.node;
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate() {
        return true;
      }
      /**
       * Modifies the component state and triggers a re-render of the component
       * and its children with the updated state
       * @public
       * @param {*}        state          The new state Object or the state handler function
       * @param {Function} updateCallback The callback function to invoke after state has been updated
       */

    }, {
      key: "setState",
      value: function setState(state, updateCallback) {
        // prevent update when receiving same state
        if (isEqual(state, this.state)) {
          return;
        }

        var newState = state; // if newState is a function

        if (isFunction(newState)) {
          // pass current currentState
          newState = newState.call(this, this.state, this.props);
        } // merge the new state with the existing


        newState = extend({}, this.state, newState); // if false, drop any state changes

        if (!this.shouldComponentUpdate(this.props, newState)) {
          return false;
        } // apply state changes


        this.state = newState; // update the component

        this.update();

        if (isFunction(updateCallback)) {
          updateCallback.call(this);
        }
      }
      /**
       * Forces re-renders the component and its children
       * @public
       */

    }, {
      key: "forceUpdate",
      value: function forceUpdate(callback) {
        this.update();

        if (isFunction(callback)) {
          callback.call(this);
        }
      }
      /**
       * updates the component
       * @public
       */

    }, {
      key: "update",
      value: function update() {
        if (this.componentWillUpdate) {
          this.componentWillUpdate(this);
        }

        var updatedComponentVDom = this.render();
        this.patch(this.componentVDom, updatedComponentVDom); // assign the new component vdom as the current one

        this.componentVDom = updatedComponentVDom;

        if (this.componentDidUpdate) {
          this.componentDidUpdate(this);
        }
      }
      /**
       * patch
       * @public
       */

    }, {
      key: "patch",
      value: function patch(oldVNode, newVNode) {
        diff(oldVNode, newVNode, this);
      }
      /**
       * remove component and its childs
       * @public
       */

    }, {
      key: "destroy",
      value: function destroy() {
        if (this.componentWillUnmount) {
          this.componentWillUnmount(this);
        }

        this.node.parentElement.removeChild(this.node);

        if (this.componentDidUnmount) {
          this.componentDidUnmount(this);
        }
      }
    }]);

    return Component;
  }();

  /**
   * Power version
   * @public
   * @type {String}
   */

  var version = '1.0.0-beta';
  var Power = {
    h: h,
    render: render,
    Component: Component,
    version: version
  };

  exports.default = Power;
  exports.render = render;
  exports.Component = Component;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
