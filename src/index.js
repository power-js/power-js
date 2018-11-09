import { h } from './vdom/h';
import { render } from './render/render';
import { Component } from './component/component';

/**
 * Power version
 * @public
 * @type {String}
 */

const version = '1.0.0-beta';

const Power = { h, render, Component, version };

export default Power;

export { render, Component, version };
