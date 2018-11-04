<p align="center" ><a href="https://github.com/power-js/power-js"><img alt="PowerJS" src="https://user-images.githubusercontent.com/1918732/47967954-4538fe00-e018-11e8-9ca6-6f7a433c2196.png" width="500" height="auto"/></a></p>

<p align="center"><strong>A powerful JavaScript library for building web components</strong></p>

<p align="center">  
  <img src="https://img.shields.io/github/license/power-js/power-js.svg">
  <img src="https://travis-ci.com/power-js/power-js.svg?branch=master">
  <img src="https://codecov.io/gh/power-js/power-js/branch/master/graph/badge.svg">
  <img src="https://img.shields.io/github/size/power-js/power-js/dist/power.js.svg">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
</p>

---

## Why PowerJS?
This library was designed as a lightweight React-like solution with a smaller footprint and faster performance. This is **not** a React replacement nor was it ever intended to be. Our goal was to provide a similar interface to prevent having to learn yet another front-end library. 

We aren't sure what this library will evolve into but we wanted to start with "good bones". Please help us define what this can be by opening some PRs or submitting ideas!


**Fast Rendering**
<br>Virtual DOM for detecting deltas and isolating renders.

**Minimalistic**
<br>Library makes use of only 3 primary functions.

**Bundle Size**
<br>Library is extremely small, just 2.3k (gzipped)

**No Dependencies**
<br>A standalone library with no dependencies.

**Components**
<br>Allows you to build components with an encapsulated state.

**React-like API**
<br>If you know how you use React then you already know how to use PowerJS.

## Links

- <a href="https://github.com/power-js/power-js/blob/master/CHANGELOG.md">Change log</a>
- <a href="https://github.com/power-js/todo-app">Example TODO app</a>

## Before you start
You can use PowerJS with just place the script into your document, but if you prefer html Syntax you should take a look at JSX. There is a <a href="https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/">Babel plugin</a> which transforms your JSX Syntax into a VDom.

## Installation

PowerJS is provided as a UMD library to accommodate any loading method.

Included via `script`
```js
<script src="power.js"></script>

// someFile.js
const { h, Component, render } = power;

// power.h, power.Component, power.render
```

Included via `import`
```js
import Power from '@power-js/core';

```

Included via `require`
```js
const Power = require('@power-js/core');

```

## Getting started

There is a <a href="https://github.com/janmarkuslanger/powerjs-starter">repository</a> on github which helps you to get started.

Here is a typical example for a counter component.

JSX:

```js
import Power, { render, Component } from '@power-js/core';

class Counter extends Component {
  render(){
    return (
      <div className="counter">
        <p>Counter: {this.props.counter.toString()}</p>
        <button click={() => { this.props.counter += 1; }}>+</button>
        <button click={() => { this.props.counter -= 1; }}>-</button>
        <button click={() => { this.props.counter = 0; }}>Reset</button>
      </div>
    )
  }
}

render(<Counter counter={0} />, document.body);
```

JS:

```js
import { h, render, Component } from '@power-js/core';

class Counter extends Component {
  render() {
    return (
      h('div', {class: 'counter'},
        h('p', null, `Counter: ${this.props.counter.toString()}`),
        h('button', {click: () => { this.props.counter += 1; }}, '+'),
        h('button', {click: () => { this.props.counter -= 1; }}, '-'),
        h('button', {click: () => { this.props.counter = 0; }}, 'Reset')
      )
    )
  }
}

const myCounter = new Counter({ counter: 0 });

render(myCounter, document.body);
```

## Contributors

Feel free to fork this project and PR!

| [<img src="https://avatars.githubusercontent.com/u/1918732?v=3" width="100px;"/><br /><sub><b>Dysfunc</b></sub>](https://github.com/dysfunc)<br />💻 👀 | [<img src="https://avatars.githubusercontent.com/u/26633123?v=3" width="100px;"/><br /><sub><b>Jan-Markus Langer</b></sub>](https://github.com/janmarkuslanger)<br />💻 👀 |
| :---: | :---: |
