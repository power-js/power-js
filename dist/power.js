!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.power={})}(this,function(t){"use strict";var d="power-id",o=0;function s(t,e,n){return this.tagName=t||"div",this.children=n||[],this.props=e||{},o+=1,this.props[d]=o,this}var a=[];var i=function(t,e,n){return t.substr(!n||n<0?0:+n,e.length)===e},r=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},p=function(t){return(i(t,"on")?t.toLowerCase():"on".concat(t))in window},f=function(t){return t&&t.constructor===s},l={},e={};["Array","Boolean","Date","Error","Function","Null","Number","Object","RegExp","String","Undefined"].forEach(function(t){var n=t.toLowerCase();l["[object ".concat(t,"]")]=n,e["is".concat(t)]=function(t){return(null===(e=t)?String(e):l[{}.toString.call(e)])===n;var e}});var c=e.isArray,u=e.isFunction,h=e.isObject,m=e.isString,n=function t(e,n){var o=n||document.body;if(u(e.tagName))return t(new e.tagName(e.props),o);if(!f(e)&&!e._power)return t(new e,o);e._power&&e.componentWillMount&&e.componentWillMount(e);var i=e.create();return i instanceof Element&&o.appendChild(i),e._power&&e.componentDidMount&&e.componentDidMount(e),e};function v(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var y=function(t){for(var e=[].slice.call(arguments,1),n=0,o=e.length;n<o;n++){var i=e[n];for(var r in i)t[r]=i[r]}return t},g=function(e,t,n){var o=t.startsWith("on")?t.substring(2,t.length).toLowerCase():t;e.addEventListener(o,function(t){return n.call(e,t,e)})},b=function(t,e,n){if(!r(e,n)&&(m(e)&&(t.style.cssText=e),h(e))){if(h(n))for(var o in n)o in e||(t.style[o]="");for(var i in e)t.style[i]=e[i]}},w={htmlFor:"for",className:"class"},C=function(t){var e=document.createElement(t.tagName.name||t.tagName);return t.props&&Object.keys(t.props).length&&function(t,e){for(var n in e)"style"!==n?p(n)?g(t,n,e[n]):((o=n)in t||"class"===o||i(o,"data-")||i(o,"power-"))&&t.setAttribute(w[n]||n,e[n]):b(t,e[n]);var o}(e,t.props),t.children&&t.children.length&&function t(e,n){for(var o=0,i=n.length;o<i;o++){var r=n[o];f(r)?(a=r,e.appendChild(C(a))):c(r)?t(e,r):(s=r,e.appendChild(document.createTextNode(s)))}var s,a}(e,t.children),e},D=function(t,e,n){var o=t.props[d];null===e.props&&(e.props={}),e.props[d]=t.props[d];var i=n.node.querySelector("[".concat(d,'="').concat(o,'"]'));!function(t,e,n){if(!r(t,e)){for(var o in r(t.style,e.style)||b(n,e.style,t.style),t)e[o]||n.removeAttribute(w[o]||o);for(var i in e)"style"===i||p(i)||t[i]&&e[i]===t[i]||n.setAttribute(w[i]||i,e[i])}}(t.props,e.props,i),function t(e,n,o,i){for(var r=0,s=n.length;r<s;r++){var a=n[r];if(void 0===e[r]&&f(a)){a.props||(a.props={});var p=C(a,i);o.appendChild(p)}else if(m(a)&&a!==e[r]){var l=document.createTextNode(a);o.replaceChild(l,o.childNodes[r])}else f(a)?D(e[r],a,i):a.pop&&e[r]&&e[r].pop&&t(e[r],a,o,i)}for(var c,u=e.length-n.length,h=e.length-1;0<u;)(c=i.node.querySelector("[".concat(d,'="').concat(e[h].props[d],'"]')))&&c.parentNode&&c.parentNode.removeChild(c),h-=1,u-=1}(t.children,e.children,i,n)},N=["push","pop","shift","unshift","splice"],S=function(){function n(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n);var e=this.constructor;this.componentWillInitialize&&this.componentWillInitialize(this),this._power=!0,this.name=e.name,this.state=u(this.getInitialState)?this.getInitialState():h(e.initialState)?e.initialState:{},this.props=u(this.getDefaultProps)?this.getDefaultProps():h(e.defaultProps)?e.defaultProps:{},t&&(this.props=y({},this.props,t)),this.componentDidInitialize&&this.componentDidInitialize(this)}var t,e,o;return t=n,(e=[{key:"create",value:function(){var i,t;return this.node=document.createElement(this.name),this.node.setAttribute("power-component",!0),this.componentVDom=this.render(),this.props=(t=(i=this).props,new Proxy(t,{get:function(t,e){var n=t[e],o={get:function(e,n){var t=e[n];return u(t)&&c(e)?function(){var t=Array.prototype[n].apply(e,arguments);return N.includes(n)&&i.shouldComponentUpdate(i.props,i.state)&&i.update(),t}:t}};return c(n)?new Proxy(n,o):n},set:function(t,e,n){var o=t[e];return i.shouldComponentUpdate(t,i.state)&&o!==n&&(t[e]=n,i.update()),!0}})),this.template=C(this.componentVDom,this),this.node.appendChild(this.template),this.node}},{key:"shouldComponentUpdate",value:function(){return!0}},{key:"setState",value:function(t,e){if(!r(t,this.state)){var n=t;if(u(n)&&(n=n.call(this,this.state,this.props)),n=y({},this.state,n),!this.shouldComponentUpdate(this.props,n))return!1;this.state=n,this.update(),u(e)&&e.call(this)}}},{key:"forceUpdate",value:function(t){this.update(),u(t)&&t.call(this)}},{key:"update",value:function(){this.componentWillUpdate&&this.componentWillUpdate(this);var t=this.render();this.patch(this.componentVDom,t),this.componentVDom=t,this.componentDidUpdate&&this.componentDidUpdate(this)}},{key:"patch",value:function(t,e){D(t,e,this)}},{key:"destroy",value:function(){this.componentWillUnmount&&this.componentWillUnmount(this),this.node.parentElement.removeChild(this.node),this.componentDidUnmount&&this.componentDidUnmount(this)}}])&&v(t.prototype,e),o&&v(t,o),n}(),U="1.0.0-beta",k={h:function(t,e){for(var n=[],o=arguments.length;2<o--;)a[a.length]=arguments[o];for(;a.length;){var i=a.pop();if(i.pop)for(var r=i.length;r--;)a[a.length]=i[r];else"boolean"==typeof i&&(i=null),"number"==typeof i&&(i=String(i)),"function"!=typeof i&&null===i&&(i=""),n[n.length]=i}return new s(t,e,n)},render:n,Component:S,version:U};t.default=k,t.render=n,t.Component=S,t.version=U,Object.defineProperty(t,"__esModule",{value:!0})});
