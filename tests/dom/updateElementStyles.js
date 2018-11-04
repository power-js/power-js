import { updateElementStyles } from '../../src/dom/updateElementStyles';

describe('dom', () => {
  describe('#updateElementStyles', () => {
    it('should update the elements style (object)', () => {
      const element = document.createElement('div');
      const oldStyle = {
        fontSize: '21px'
      };
      const newStyle = {
        fontSize: '14px',
        backgroundColor: '#000'
      };

      expect(element.style.backgroundColor).toEqual('');

      updateElementStyles(element, newStyle, oldStyle);

      expect(element.style.backgroundColor).toEqual('rgb(0, 0, 0)');
      expect(element.style.fontSize).toEqual('14px');

      updateElementStyles(element, { fontWeight: '700' }, newStyle);

      expect(element.style.fontWeight).toEqual('700');
    });

    it('should update the elements style (string)', () => {
      const element = document.createElement('div');
      const oldStyle = {};
      const newStyle = 'font-size: 14px';

      expect(element.style.cssText).toEqual('');

      updateElementStyles(element, newStyle, oldStyle);

      expect(element.style.cssText).toEqual('font-size: 14px;');
    });

    it('should not do anything if nothing has changed', () => {
      const element = document.createElement('div');
      const oldStyle = {};
      const newStyle = {
        fontSize: '14px'
      };

      updateElementStyles(element, newStyle, oldStyle);

      expect(element.style.cssText).toEqual('font-size: 14px;');

      updateElementStyles(element, { fontSize: '14px' }, newStyle);
    });
  });
});
