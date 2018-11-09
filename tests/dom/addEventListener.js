import { addEventListener } from '../../src/dom/addEventListener';

describe('dom', () => {
  describe('#addEventListener', () => {
    it('should attach an event listener to the specified element (event name w/ preceeding "on")', () => {
      const element = document.createElement('div');

      const onClick = jest.fn();

      addEventListener(element, 'onClick', onClick);

      document.body.appendChild(element);

      const spy = jest.spyOn(element, 'click');

      element.click();

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });

    it('should attach an event listener to the specified element', () => {
      const element = document.createElement('div');

      const onClick = jest.fn();

      addEventListener(element, 'click', onClick);

      document.body.appendChild(element);

      const spy = jest.spyOn(element, 'click');

      element.click();

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });
});
