!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.power={})}(this,function(t){"use strict";var f="power-id",o=0;function a(t,e,n){return this.tagName=t||"div",this.children=n||[],this.props=e||{},o+=1,this.props[f]=o,this}var s=[];var r=function(t,e,n){return t.substr(!n||n<0?0:+n,e.length)===e},i=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},p=function(t){return(r(t,"on")?t.toLowerCase():"on".concat(t))in window},d=function(t){return t&&t.constructor===a},l={},e={};["Array","Boolean","Date","Error","Function","Null","Number","Object","RegExp","String","Undefined"].forEach(function(t){var n=t.toLowerCase();l["[object ".concat(t,"]")]=n,e["is".concat(t)]=function(t){return(null===(e=t)?String(e):l[{}.toString.call(e)])===n;var e}});var c=e.isArray,u=e.isFunction,h=e.isObject,m=e.isString,n=function t(e,n){var o=n||document.body;if(u(e.tagName))return t(new e.tagName(e.props),o);if(!d(e)&&!e._power)return t(new e,o);e._power&&e.componentWillMount&&e.componentWillMount(e);var r=e.create();return r instanceof Element&&o.appendChild(r),e._power&&e.componentDidMount&&e.componentDidMount(e),e};function v(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var y=function(t){for(var e=[].slice.call(arguments,1),n=0,o=e.length;n<o;n++){var r=e[n];for(var i in r)t[i]=r[i]}return t},g=function(e,t,n){var o=t.startsWith("on")?t.substring(2,t.length).toLowerCase():t;e.addEventListener(o,function(t){return n.call(e,t,e)})},b=function(t,e,n){if(!i(e,n)&&(m(e)&&(t.style.cssText=e),h(e))){if(h(n))for(var o in n)o in e||(t.style[o]="");for(var r in e)t.style[r]=e[r]}},C={htmlFor:"for",className:"class"},w=function(t){var e=document.createElement(t.tagName.name||t.tagName),n=document.createDocumentFragment();return t.children&&t.children.length&&function t(e,n){for(var o=0,r=n.length;o<r;o++){var i=n[o];d(i)?(s=i,e.appendChild(w(s))):c(i)?t(e,i):(a=i,e.appendChild(document.createTextNode(a)))}var a,s}(n,t.children),e.appendChild(n),t.props&&Object.keys(t.props).length&&function(t,e){for(var n in e)"style"!==n?p(n)?g(t,n,e[n]):((o=n)in t||"class"===o||r(o,"data-")||r(o,"power-")||"key"===n)&&t.setAttribute(C[n]||n,e[n]):b(t,e[n]);var o}(e,t.props),e},k=function(t,e,n){var o=t.props[f];null===e.props&&(e.props={}),e.props[f]=t.props[f];var r=n.node.querySelector("[".concat(f,'="').concat(o,'"]'));!function(t,e,n){if(!i(t,e)){for(var o in i(t.style,e.style)||b(n,e.style,t.style),t)e[o]||n.removeAttribute(C[o]||o);for(var r in e)"style"===r||p(r)||t[r]&&e[r]===t[r]||n.setAttribute(C[r]||r,e[r])}}(t.props,e.props,r),e.children.length&&e.children[0].props&&e.children[0].props.key?function(t,n,o,e){var r=t.map(function(t){return t.props.key}),i=n.map(function(t){return t.props.key});if(r.length>i.length){var a=r.filter(function(t){return i.indexOf(t)<0});if(1===a.length){var s=o.querySelector('[key="'.concat(a[0],'"]'));o.removeChild(s)}else{for(var p="",l=0,c=a.length;l<c;l++)p+='[key="'.concat(a[l],'"],');o.querySelectorAll(p.slice(0,p.length-1)).forEach(function(t){return t.parentNode.removeChild(t)})}}else r.length<i.length&&i.filter(function(t){return r.indexOf(t)<0}).forEach(function(e){n.forEach(function(t){t.props.key===e&&o.appendChild(w(t))})})}(t.children,e.children,r):function t(e,n,o,r){for(var i=0,a=n.length;i<a;i++){var s=n[i];if(void 0===e[i]&&d(s)){s.props||(s.props={});var p=w(s,r);o.appendChild(p)}else if(m(s)&&s!==e[i]){var l=document.createTextNode(s);o.replaceChild(l,o.childNodes[i])}else d(s)?k(e[i],s,r):s.pop&&e[i]&&e[i].pop&&t(e[i],s,o,r)}for(var c,u=e.length-n.length,h=e.length-1;0<u;)(c=r.node.querySelector("[".concat(f,'="').concat(e[h].props[f],'"]')))&&c.parentNode&&c.parentNode.removeChild(c),h-=1,u-=1}(t.children,e.children,r,n)},D=["push","pop","shift","unshift","splice"],N=function(){function n(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n);var e=this.constructor;this.componentWillInitialize&&this.componentWillInitialize(this),this._power=!0,this.name=e.name,this.state=u(this.getInitialState)?this.getInitialState():h(e.initialState)?e.initialState:{},this.props=u(this.getDefaultProps)?this.getDefaultProps():h(e.defaultProps)?e.defaultProps:{},t&&(this.props=y({},this.props,t)),this.componentDidInitialize&&this.componentDidInitialize(this)}var t,e,o;return t=n,(e=[{key:"create",value:function(){var r,t;return this.node=document.createElement(this.name),this.node.setAttribute("power-component",!0),this.componentVDom=this.render(),this.props=(t=(r=this).props,new Proxy(t,{get:function(t,e){var n=t[e],o={get:function(e,n){var t=e[n];return u(t)&&c(e)?function(){var t=Array.prototype[n].apply(e,arguments);return D.includes(n)&&r.shouldComponentUpdate(r.props,r.state)&&r.update(),t}:t}};return c(n)?new Proxy(n,o):n},set:function(t,e,n){var o=t[e];return r.shouldComponentUpdate(t,r.state)&&o!==n&&(t[e]=n,r.update()),!0}})),this.template=w(this.componentVDom,this),this.node.appendChild(this.template),this.node}},{key:"shouldComponentUpdate",value:function(){return!0}},{key:"setState",value:function(t,e){if(!i(t,this.state)){var n=t;if(u(n)&&(n=n.call(this,this.state,this.props)),n=y({},this.state,n),!this.shouldComponentUpdate(this.props,n))return!1;this.state=n,this.update(),u(e)&&e.call(this)}}},{key:"forceUpdate",value:function(t){this.update(),u(t)&&t.call(this)}},{key:"update",value:function(){this.componentWillUpdate&&this.componentWillUpdate(this);var t=this.render();this.patch(this.componentVDom,t),this.componentVDom=t,this.componentDidUpdate&&this.componentDidUpdate(this)}},{key:"patch",value:function(t,e){k(t,e,this)}},{key:"destroy",value:function(){this.componentWillUnmount&&this.componentWillUnmount(this),this.node.parentElement.removeChild(this.node),this.componentDidUnmount&&this.componentDidUnmount(this)}}])&&v(t.prototype,e),o&&v(t,o),n}(),S="1.0.0-beta",U={h:function(t,e){for(var n=[],o=arguments.length;2<o--;)s[s.length]=arguments[o];for(;s.length;){var r=s.pop();if(r.pop)for(var i=r.length;i--;)s[s.length]=r[i];else"boolean"==typeof r&&(r=null),"number"==typeof r&&(r=String(r)),"function"!=typeof r&&null===r&&(r=""),n[n.length]=r}return new a(t,e,n)},render:n,Component:N,version:S};t.default=U,t.render=n,t.Component=N,t.version=S,Object.defineProperty(t,"__esModule",{value:!0})});
