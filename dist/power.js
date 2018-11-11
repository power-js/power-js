!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.power={})}(this,function(t){"use strict";var d="power-id",u=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},c=function(t){return(t.startsWith("on")?t.toLowerCase():"on".concat(t))in window},f=function(t){return t&&t.constructor===s},o={},e={};["Array","Boolean","Date","Error","Function","Null","Number","Object","RegExp","String","Undefined"].forEach(function(t){var n=t.toLowerCase();o["[object ".concat(t,"]")]=n,e["is".concat(t)]=function(t){return(null===(e=t)?String(e):o[{}.toString.call(e)])===n;var e}});var p=e.isArray,i=e.isFunction,a=e.isObject,v=e.isString,r=0;function s(t,e,n){if(this.tagName=t||"div",this.children=n||[],this.props=e||{},i(this.tagName)){var o=new this.tagName(this.props);return o.render?o.render():o}return r+=1,this.props[d]=r,this}var l=[];var h=function(t){return this.$events[t.type](t)},m=function(t,e,n){if(!u(e,n)&&(v(e)&&(t.style.cssText=e),a(e))){if(a(n))for(var o in n)o in e||(t.style[o]="");for(var r in e)t.style[r]=e[r]}},g={htmlFor:"for",className:"class"},y=function(t,e,n){if(n)for(var o in n)e[o]||(c(o)&&t.$events[o]?t.removeEventListener(o,t.$events[o]):t.removeAttribute(g[o]||o));for(var r in e)"style"!==r||u(t.style,e.style)?c(r)?(a=t,p=e[s=r],void 0,l=s.startsWith("on")?s.substring(2,s.length).toLowerCase():s,a.addEventListener(l,h),a.$events||(a.$events={}),a.$events[l]=p):((i=r)in t||"class"===i||i.startsWith("data-")||i.startsWith("power-")||"key"===r)&&(t[r]&&e[r]===t[r]||t.setAttribute(g[r]||r,e[r])):m(t,e[r]);var i,a,s,p,l},b=function(t){var e=document.createElement(t.tagName.name||t.tagName),n=document.createDocumentFragment();return t.children&&t.children.length&&function t(e,n){for(var o=0,r=n.length;o<r;o++){var i=n[o];f(i)?(s=i,e.appendChild(b(s))):p(i)?t(e,i):(a=i,e.appendChild(document.createTextNode(a)))}var a,s}(n,t.children),e.appendChild(n),t.props&&Object.keys(t.props).length&&y(e,t.props),e},n=function t(e,n){var o=n||document.body;if(i(e.tagName))return t(new e.tagName(e.props),o);if(!f(e)&&!e._power)return t(new e,o);e._power&&e.componentWillMount&&e.componentWillMount(e);var r=e._power?e.create():b(e);return r instanceof Element&&o.appendChild(r),e._power&&e.componentDidMount&&e.componentDidMount(e),e};function w(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var C=function(t){for(var e=[].slice.call(arguments,1),n=0,o=e.length;n<o;n++){var r=e[n];for(var i in r)t[i]=r[i]}return t},k=function(t,e,n){var o=t.props[d];null===e.props&&(e.props={}),e.props[d]=o;var r,i,a,s,p,l=n.node.querySelector("[".concat(d,'="').concat(o,'"]')),c=e.children,h=t.children;r=h,(i=c).length&&i[0].props&&i[0].props.key||r.length&&r[0].props&&r[0].props.key?function(t,e,n){var o=t.map(function(t){return t.props.key}),r=e.map(function(t){return t.props.key}),i=function(t,e){for(var n=[],o=[],r=0,i=t.length;r<i;r++)n[t[r]]=!0;for(var a=0,s=e.length;a<s;a++)n[e[a]]?delete n[e[a]]:n[e[a]]=!0;for(var p in n)o[o.length]=p;return o}(o,r);if(o.length>r.length)for(var a=0,s=i.length;a<s;a++)for(var p=i[a],l=0,c=n.children.length;l<c;l++){var h=n.children[l];if(h&&h.attributes.key.value===p){n.removeChild(h);break}}else if(o.length<r.length)for(var u=0,d=i.length;u<d;u++)for(var f=i[u],v=e.length-1;0<=v;v--){var m=e[v];if(String(m.props.key)===f){n.appendChild(b(m));break}}}(h,c,l):function t(e,n,o,r){for(var i=0,a=n.length;i<a;i++){var s=n[i];if(void 0===e[i]&&f(s)){s.props||(s.props={});var p=b(s,r);o.appendChild(p)}else if(v(s)&&s!==e[i]){var l=document.createTextNode(s);o.replaceChild(l,o.childNodes[i])}else f(s)?k(e[i],s,r):s.pop&&e[i]&&e[i].pop&&t(e[i],s,o,r)}for(var c,h=e.length-n.length,u=e.length-1;0<h;)(c=r.node.querySelector("[".concat(d,'="').concat(e[u].props[d],'"]')))&&c.parentNode&&c.parentNode.removeChild(c),u-=1,h-=1}(h,c,l,n),a=t.props,s=e.props,p=l,u(a,s)||y(p,s,a)},N=["push","pop","shift","unshift","splice"],D=function(){function n(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n);var e=this.constructor;this.componentWillInitialize&&this.componentWillInitialize(this),this._power=!0,this.name=e.name,this.props=i(this.getDefaultProps)?this.getDefaultProps():a(e.defaultProps)?e.defaultProps:{},t&&(this.props=C({},this.props,t)),this.state=i(this.getInitialState)?this.getInitialState():a(e.initialState)?e.initialState:{},this.componentDidInitialize&&this.componentDidInitialize(this)}var t,e,o;return t=n,(e=[{key:"create",value:function(){var r,t;return this.node=document.createElement(this.name),this.node.setAttribute("power-component",!0),this.props=(t=(r=this).props,new Proxy(t,{get:function(t,e){var n=t[e],o={get:function(e,n){var t=e[n];return i(t)&&p(e)?function(){var t=Array.prototype[n].apply(e,arguments);return N.includes(n)&&r.shouldComponentUpdate(r.props,r.state)&&r.update(),t}:t}};return p(n)?new Proxy(n,o):n},set:function(t,e,n){var o=t[e];return r.shouldComponentUpdate(t,r.state)&&o!==n&&(t[e]=n,r.update()),!0}})),this.componentVDom=this.render(),this.node.appendChild(b(this.componentVDom,this)),this.node}},{key:"shouldComponentUpdate",value:function(){return!0}},{key:"setState",value:function(t,e){var n=this.state;if(!u(t,n)){var o=this.props,r=t;if(i(r)&&(r=r.call(this,n,o)),r=C({},n,r),!this.shouldComponentUpdate(o,r))return!1;this.state=r,this.update(),i(e)&&e.call(this)}}},{key:"forceUpdate",value:function(t){this.update(),i(t)&&t.call(this)}},{key:"update",value:function(){this.componentWillUpdate&&this.componentWillUpdate(this);var t=this.render();this.patch(this.componentVDom,t),this.componentVDom=t,this.componentDidUpdate&&this.componentDidUpdate(this)}},{key:"patch",value:function(t,e){k(t,e,this)}},{key:"destroy",value:function(){this.componentWillUnmount&&this.componentWillUnmount(this),this.node.parentNode.removeChild(this.node),this.node=null,this.componentDidUnmount&&this.componentDidUnmount(this)}}])&&w(t.prototype,e),o&&w(t,o),n}(),S="1.0.0-beta",U={h:function(t,e){for(var n=[],o=arguments.length;2<o--;)l[l.length]=arguments[o];for(;l.length;){var r=l.pop();if(r&&r.pop)for(var i=r.length;i--;)l[l.length]=r[i];else"boolean"==typeof r&&(r=null),"number"==typeof r&&(r=String(r)),"function"!=typeof r&&null==r&&(r=""),n[n.length]=r}return new s(t,e,n)},render:n,Component:D,version:S};t.default=U,t.render=n,t.Component=D,t.version=S,Object.defineProperty(t,"__esModule",{value:!0})});
