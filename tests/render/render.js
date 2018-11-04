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

    it('should trigger componentWillMount and componentDidMount', () => {
      const componentDidMount = jest.fn();
      const componentWillMount = jest.fn();

      MyComponent.prototype.componentDidMount = componentDidMount;
      MyComponent.prototype.componentWillMount = componentWillMount;

      const spyDid = jest.spyOn(MyComponent.prototype, 'componentDidMount');
      const spyWill = jest.spyOn(MyComponent.prototype, 'componentWillMount');

      render(<MyComponent />, document.body);

      expect(componentDidMount).toHaveBeenCalledTimes(1);
      expect(spyDid).toHaveBeenCalled();

      expect(componentWillMount).toHaveBeenCalledTimes(1);
      expect(spyWill).toHaveBeenCalled();

      spyDid.mockRestore();
      spyWill.mockRestore();
    });

    it('should throw if the root element is invalid', () => {
      expect(() => render(<MyComponent />, null)).toThrowError('You MUST provide a valid DOM element as your root.');
    });

    it('should handle component classes (not vnodes)', () => {
      expect(MyComponent._power).toBeUndefined();
      const result = render(MyComponent, document.body);

      expect(result._power).toBe(true);
      expect(result.name).toBe('MyComponent');
    });
  });
});
