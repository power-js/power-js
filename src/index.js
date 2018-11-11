import { h } from './vdom/h';
import { render } from './render/render';
import { Component } from './component/component';

/**
 * Power version
 * @public
 * @type {String}
 */
const version = '1.0.0-alpha';

export default { h, render, Component, version };

export { h, render, Component, version };
