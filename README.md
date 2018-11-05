<p align="center" ><a href="https://github.com/power-js/power-js"><img alt="PowerJS" src="https://user-images.githubusercontent.com/1918732/47975313-295a4a00-e062-11e8-8ae7-2e6124405f9c.png" width="500" height="auto"/></a></p>

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
<br>Library is extremely small, just 2.2k (gzipped)

**No Dependencies**
<br>A standalone library with no dependencies.

**Components**
<br>Allows you to build components with an encapsulated state.

**React-like API**
<br>If you know how you use React then you already know how to use PowerJS.

## Links

- <a href="https://github.com/power-js/power-js/blob/master/CHANGELOG.md">Change log</a>
- <a href="https://github.com/power-js/todo-app">A simple Todo app</a>

## Before you start
If you would like to use JSX with PowerJS you'll need to install this [Babel Plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) which will convert the JSX into a Virtual DOM. There's an example of this plugin config in the Todo app [here](https://github.com/power-js/todo-app/blob/master/.babelrc).

## Installation

PowerJS is provided as a UMD library to accommodate any loading method.

### Script
Included via `script`
```js
<script src="power.js"></script>

// someFile.js
const { h, Component, render } = power;

// power.h, power.Component, power.render
```

### NPM
You'll need to install PowerJS via NPM
```js
npm install @power-js/core
```

Include via `import`
```js
import Power from '@power-js/core';

```

Include via `require`
```js
const Power = require('@power-js/core');

```

## Example
Here's an example of a simple counter component.

JSX:

```jsx
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


## Contributing

The purpose of this repo is to continue to evolve PowerJS as an open source project driven by its contributors and communal support. We appreciate all the support we've received, and look forward to working with many new faces. To get started contributing just review our contribution guide, code of conduct and open a PR.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

We have a Code of Conduct that we expect collaborators to adhere to. Please read it [in its entirety](./CODE_OF_CONDUCT.md) so you understand our expectations of you and what is acceptable behavior.

### [Contributing Guide](CONTRIBUTING.md)

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process.

### Core Contributors

[Jan-Markus Langer](https://github.com/janmarkuslanger) · [Dysfunc](https://github.com/dysfunc)

### License

[MIT](./LICENSE)
