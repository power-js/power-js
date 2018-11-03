!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.power={})}(this,function(t){"use strict";var f="power-id",o=0;function a(t,e,n){return this.tagName=t||"div",this.children=n||[],this.props=e||{},o+=1,this.props[f]=o,this}var s=[];var i=function(t,e,n){return t.substr(!n||n<0?0:+n,e.length)===e},r=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},p=function(t){return(i(t,"on")?t.toLowerCase():"on".concat(t))in window},l=function(t){return t instanceof Element},d=function(t){return t&&t.constructor===a},c={},e={};["Array","Boolean","Date","Error","Function","Null","Number","Object","RegExp","String","Undefined"].forEach(function(t){var n=t.toLowerCase();c["[object ".concat(t,"]")]=n,e["is".concat(t)]=function(t){return(null===(e=t)?String(e):c[{}.toString.call(e)])===n;var e}});var u=e.isArray,h=e.isFunction,m=e.isObject,v=e.isString,y=function(e,t,n){var o=t.startsWith("on")?t.substring(2,t.length).toLowerCase():t;e.addEventListener(o,function(t){return n.call(e,t,e)})},g=function(t,e,n){if(!r(e,n)&&(v(e)&&(t.style.cssText=e),m(e))){if(m(n))for(var o in n)o in e||(t.style[o]="");for(var i in e)t.style[i]=e[i]}},w={htmlFor:"for",className:"class"},b=function(t){var e=document.createElement(t.tagName.name||t.tagName);return m(t.props)&&function(t,e){for(var n in e)"style"!==n?p(n)?y(t,n,e[n]):((o=n)in t||"class"===o||i(o,"data-")||i(o,"power-"))&&t.setAttribute(w[n]||n,e[n]):g(t,e[n]);var o}(e,t.props),t.children&&t.children.length&&function t(e,n){for(var o=0,i=n.length;o<i;o++){var r=n[o];d(r)?(s=r,e.appendChild(b(s))):u(r)?t(e,r):(a=r,e.appendChild(document.createTextNode(a)))}var a,s}(e,t.children),e},n=function t(e,n){if(h(e.tagName))return t(new e.tagName(e.props),n);if(!l(n))throw"You MUST provide a valid DOM element as your root.";if(!d(e)&&!e._power)return t(new e,n);e._power&&e.componentWillMount&&e.componentWillMount(e);var o=e._power?e.create():b(e);l(o)&&n.appendChild(o),e._power&&e.componentDidMount&&e.componentDidMount(e)};function C(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var N=function(t){for(var e=[].slice.call(arguments,1),n=0,o=e.length;n<o;n++){var i=e[n];for(var r in i)t[r]=i[r]}return t},D=function(t,e,n){var o=t.props[f];null===e.props&&(e.props={}),e.props[f]=t.props[f];var i=n.node.querySelector("[".concat(f,'="').concat(o,'"]'));t.tagName,e.tagName,S(t.props,e.props,i),U(t.children,e.children,i,n)},S=function(t,e,n){if(!r(t,e)){for(var o in r(t.style,e.style)||g(n,e.style,t.style),t)e[o]||n.removeAttribute(w[o]||o);for(var i in e)"style"===i||p(i)||t[i]&&e[i]===t[i]||n.setAttribute(w[i]||i,e[i])}},U=function t(e,n,o,i){for(var r=0,a=n.length;r<a;r++){var s=n[r];if(void 0===e[r]&&d(s)){s.props||(s.props={});var p=b(s,i);o.appendChild(p)}else if(v(s)&&s!==e[r]){var l=document.createTextNode(s);o.replaceChild(l,o.childNodes[r])}else d(s)?D(e[r],s,i):s.pop&&e[r]&&e[r].pop&&t(e[r],s,o,i)}for(var c,u=e.length-n.length,h=e.length-1;0<u;)(c=i.node.querySelector("[".concat(f,'="').concat(e[h].props[f],'"]')))&&c.parentNode&&c.parentNode.removeChild(c),h-=1,u-=1},x=["push","pop","shift","unshift","splice"],E=function(){function n(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n);var e=this.constructor;this.componentWillInitialize&&this.componentWillInitialize(this),this._power=!0,this.name=e.name,this.state=h(this.getInitialState)?this.getInitialState():m(e.initialState)?e.initialState:{},this.props=h(this.getDefaultProps)?this.getDefaultProps():m(e.defaultProps)?e.defaultProps:{},t&&(this.props=N({},this.props,t)),this.componentDidInitialize&&this.componentDidInitialize(this)}var t,e,o;return t=n,(e=[{key:"create",value:function(){var i,t;return this.node=document.createElement(this.name),this.node.setAttribute("power-component",!0),this.componentVDom=this.render(),this.props=(t=(i=this).props,new Proxy(t,{get:function(t,e){var n=t[e],o={get:function(e,n){var t=e[n];return h(t)&&u(e)?function(){var t=Array.prototype[n].apply(e,arguments);return x.includes(n)&&i.shouldComponentUpdate(i.props,i.state)&&i.update(),t}:t}};return u(n)?new Proxy(n,o):n},set:function(t,e,n){var o=t[e];return i.shouldComponentUpdate(t,i.state)&&o!==n&&(t[e]=n,i.update()),!0}})),this.template=b(this.componentVDom,this),this.node.appendChild(this.template),this.node}},{key:"shouldComponentUpdate",value:function(){return!0}},{key:"setState",value:function(t,e){if(!r(t,this.state)){var n=t;if(h(n)&&(n=n.call(this,this.state,this.props)),n=N({},this.state,n),!this.shouldComponentUpdate(this.props,n))return!1;this.state=n,this.update(),h(e)&&e.call(this)}}},{key:"forceUpdate",value:function(t){this.update(),h(t)&&t.call(this)}},{key:"update",value:function(){this.componentWillUpdate&&this.componentWillUpdate(this);var t=this.render();this.patch(this.componentVDom,t),this.componentVDom=t,this.componentDidUpdate&&this.componentDidUpdate(this)}},{key:"patch",value:function(t,e){D(t,e,this)}},{key:"destroy",value:function(){this.componentWillUnmount&&this.componentWillUnmount(this),this.node.parentElement.removeChild(this.node),this.componentDidUnmount&&this.componentDidUnmount(this)}}])&&C(t.prototype,e),o&&C(t,o),n}(),W="1.0.0-beta",k={h:function(t,e){for(var n=[],o=arguments.length;2<o--;)s[s.length]=arguments[o];for(;s.length;){var i=s.pop();if(i.pop)for(var r=i.length;r--;)s[s.length]=i[r];else"boolean"==typeof i&&(i=null),"number"==typeof i&&(i=String(i)),"function"!=typeof i&&null===i&&(i=""),n[n.length]=i}return new a(t,e,n)},render:n,Component:E,version:W};t.default=k,t.render=n,t.Component=E,t.version=W,Object.defineProperty(t,"__esModule",{value:!0})});
