import { render } from '../../src/render/render';
import { h } from '../../src/vdom/h';
import { Component } from '../../src/component/component';
import { VNode } from '../../src/vdom/vnode';

class MyComponent extends Component {
  render() {
    return <div id="hello">World</div>;
  }
}

describe('render', () => {
  describe('#render', () => {
    it('should render the component to a root element', () => {
      render(<MyComponent />, document.body);
      const element = document.querySelector('#hello');

      expect(element).toBeDefined();
      expect(element.textContent === 'World').toBe(true);
    });

    it('should throw if the root element is invalid', () => {
      expect(() => render(<MyComponent />, null)).toThrowError('You MUST provide a valid DOM element as your root.');
    });
  });
});
