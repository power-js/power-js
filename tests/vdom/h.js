import { h } from '../../src/vdom/h';
import { Component } from '../../src/component/component';

class MyComponent extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

describe('vdom', () => {
  describe('#h', () => {
    it('should return a VNode with the expected attributes', () => {
      const component = <MyComponent />;

      expect(component).toHaveProperty('tagName');
      expect(component).toHaveProperty('children');
      expect(component).toHaveProperty('props');
    });

    it('should contain children of mixed types', () => {
      const component = (
        <MyComponent id="test">
          <MyComponent>
            <div>Hello</div>
            <div>{[<span>World</span>]}</div>
          </MyComponent>
          {true}
        </MyComponent>
      );

      expect(Array.isArray(component.children)).toBe(true);
      expect(component.children[0].constructor.name).toEqual('VNode');
      expect(component.props.id).toEqual('test');
      expect(typeof component.children[1] === 'string').toBe(true);
      expect(component).toMatchSnapshot();
    });

    it('should handle rendering of invalid children (boolean)', () => {
      const component = (
        <MyComponent>
          <MyComponent>Hello</MyComponent>
          {true}
        </MyComponent>
      );

      expect(Array.isArray(component.children)).toBe(true);
      expect(component.children[1]).toEqual('');
      expect(component).toMatchSnapshot();
    });

    it('should handle rendering of invalid children (number)', () => {
      const component = (
        <MyComponent>
          <MyComponent>Hello</MyComponent>
          {1}
        </MyComponent>
      );

      expect(Array.isArray(component.children)).toBe(true);
      expect(component.children[1]).toEqual('1');
      expect(component).toMatchSnapshot();
    });
  });
});
