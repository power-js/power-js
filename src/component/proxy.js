import { isArray, isFunction } from '../utils/is';

const ARRAY_MODIFIERS = ['push', 'pop', 'shift', 'unshift', 'splice'];

/**
 * Wraps our prop/state objects to we can control writes and/or detect prop modifications specifically with Arrays
 * @param   {Class}   Component
 * @param   {Object}  source
 * @param   {Boolean} isStateObject
 * @return  {Proxy}
 */
export const proxy = (component, source) => {
  const handler = {
    get(target, prop) {
      const value = target[prop];

      const arrayHandler = {
        get(target, prop) {
          const value = target[prop];
          if (isFunction(value)) {
            if (isArray(target)) {
              // allow operation through
              return function() {
                const array = Array.prototype[prop].apply(target, arguments);

                if (ARRAY_MODIFIERS.includes(prop)) {
                  if (component.shouldComponentUpdate(component.props, component.state)) {
                    component.rerender();
                  }
                }

                return array;
              };
            }
          }

          return value;
        }
      };

      if (isArray(value)) {
        return new Proxy(value, arrayHandler);
      }

      return value;
    },
    set(target, prop, value) {
      const currentValue = target[prop];

      if (!component.shouldComponentUpdate(target, component.state)) {
        return true;
      }

      if (currentValue !== value) {
        // set value
        target[prop] = value;
        // update component
        component.rerender();
      }
      // return true to indicate that assignment succeeded
      return true;
    }
  };

  return new Proxy(source, handler);
};
