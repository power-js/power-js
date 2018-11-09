import { isArray, isBoolean, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isUndefined } from '../../../src/utils/is/common';

describe('utils/is/common', () => {
  describe('#isArray', () => {
    it('should validate if [] is an array', () => {
      expect(isArray([])).toBe(true);
    });

    it('should validate if a string is not an array', () => {
      expect(isArray('hallo world')).toBe(false);
    });

    it('should validate if an object is not an array', () => {
      expect(isArray({})).toBe(false);
    });

    it('should validate if null is not an array', () => {
      expect(isArray(null)).toBe(false);
    });

    it('should validate if undefined is not an array', () => {
      expect(isArray(undefined)).toBe(false);
    });

    it('should validate if a number is an not array', () => {
      expect(isArray(9999999)).toBe(false);
    });
  });

  describe('#isBoolean', () => {
    it('should validate if a true is a boolean', () => {
      expect(isBoolean(true)).toBe(true);
    });

    it('should validate if a false is a boolean', () => {
      expect(isBoolean(false)).toBe(true);
    });

    it('should validate if a number is not a boolean', () => {
      expect(isBoolean(2323)).toBe(false);
    });

    it('should validate if a string is not a boolean', () => {
      expect(isBoolean('hello world')).toBe(false);
    });

    it('should validate if a null is not a boolean', () => {
      expect(isBoolean(null)).toBe(false);
    });

    it('should validate if a undefined is not a boolean', () => {
      expect(isBoolean(undefined)).toBe(false);
    });

    it('should validate if an array is not a boolean', () => {
      expect(isBoolean(['one', 'two'])).toBe(false);
    });

    it('should validate if an object is not a boolean', () => {
      expect(isBoolean({ test: 'anothertest' })).toBe(false);
    });
  });

  describe('#isError', () => {
    it('should validate if an Error is an Error', () => {
      expect(isError(new Error())).toBe(true);
    });

    it('should validate if Null is not an Error', () => {
      expect(isError(null)).toBe(false);
    });

    it('should validate if string is not an Error', () => {
      expect(isError('test')).toBe(false);
    });

    it('should validate if number is not an Error', () => {
      expect(isError(100)).toBe(false);
    });

    it('should validate if an array is not an Error', () => {
      expect(isError([234, 234])).toBe(false);
    });

    it('should validate if an object is not an Error', () => {
      expect(isError({ test: 'test' })).toBe(false);
    });
  });

  describe('#isFunction', () => {
    it('should validate if an arrow function is a function', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('should validate if a function is a function', () => {
      expect(isFunction(function test() {})).toBe(true);
    });

    it('should validate if a function with a return statement is a function', () => {
      expect(
        isFunction(function test() {
          return false;
        })
      ).toBe(true);
    });

    it('should validate if an object is not a function', () => {
      expect(isFunction({ test: 2 })).toBe(false);
    });

    it('should validate if an array is not a function', () => {
      expect(isFunction(['3234', 'asdasd'])).toBe(false);
    });

    it('should validate if a number is not a function', () => {
      expect(isFunction(2)).toBe(false);
    });

    it('should validate if a string is not a function', () => {
      expect(isFunction('sdf')).toBe(false);
    });
  });

  describe('#isNull', () => {
    it('should validate if an null is null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should validate if undefined is not null', () => {
      expect(isNull(undefined)).toBe(false);
    });

    it('should validate if an array is not null', () => {
      expect(isNull([])).toBe(false);
    });

    it('should validate if an object is not null', () => {
      expect(isNull({})).toBe(false);
    });

    it('should validate if a string is not null', () => {
      expect(isNull('hello world')).toBe(false);
    });

    it('should validate if a number is not null', () => {
      expect(isNull(234234)).toBe(false);
    });
  });

  describe('#isNumber', () => {
    it('should validate that null is not a number', () => {
      expect(isNumber(null)).toBe(false);
    });

    it('should validate that a string is not a number (int)', () => {
      expect(isNumber('123')).toBe(false);
    });

    it('should validate that a string is not a number (float)', () => {
      expect(isNumber('12.3')).toBe(false);
    });

    it('should validate that a number is a number (int)', () => {
      expect(isNumber(12)).toBe(true);
    });

    it('should validate that a number is a number (float)', () => {
      expect(isNumber(12.3)).toBe(true);
    });
  });

  describe('#isObject', () => {
    it('should validate if an object is an object', () => {
      expect(isObject({ test: 'hello world' })).toBe(true);
    });

    it('should validate if a string is not an object', () => {
      expect(isObject('hello world')).toBe(false);
    });

    it('should validate if a number is not an object', () => {
      expect(isObject(234234)).toBe(false);
    });

    it('should validate if an array is not an object', () => {
      expect(isObject(['asd', 234])).toBe(false);
    });

    it('should validate if null is not an object', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should validate if undefined is not an object', () => {
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe('#isRegExp', () => {
    it('should validate if literal RegExp is a RegExp', () => {
      const myReg = /ab+c/i;
      expect(isRegExp(myReg)).toBe(true);
    });

    it('should validate if constructor RegExp is a RegExp', () => {
      const myReg = new RegExp('ab+c', 'i');
      expect(isRegExp(myReg)).toBe(true);
    });

    it('should validate if null is not a RegExp', () => {
      expect(isRegExp(null)).toBe(false);
    });

    it('should validate if undefined is not a RegExp', () => {
      expect(isRegExp(undefined)).toBe(false);
    });

    it('should validate if an array is not a RegExp', () => {
      expect(isRegExp([undefined, null])).toBe(false);
    });

    it('should validate if an object is not a RegExp', () => {
      expect(isRegExp({ test: 'test' })).toBe(false);
    });
  });

  describe('#isString', () => {
    it('should validate if a string is a string', () => {
      expect(isString('It´s a string')).toBe(true);
    });

    it('should validate if undefined is not a string', () => {
      expect(isString(undefined)).toBe(false);
    });

    it('should validate if an array is not a string', () => {
      expect(isString([])).toBe(false);
    });

    it('should validate if an object is not a string', () => {
      expect(isString({})).toBe(false);
    });

    it('should validate if null is not a string', () => {
      expect(isString(null)).toBe(false);
    });

    it('should validate if a number is not a string', () => {
      expect(isString(234234)).toBe(false);
    });
  });

  describe('#isUndefined', () => {
    it('should validate if undefined is undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should validate if null is not undefined', () => {
      expect(isUndefined(null)).toBe(false);
    });

    it('should validate if string is not undefined', () => {
      expect(isUndefined('Hello World')).toBe(false);
    });

    it('should validate if number is not undefined', () => {
      expect(isUndefined(999)).toBe(false);
    });

    it('should validate if an array is not undefined', () => {
      expect(isUndefined([90, 'Test'])).toBe(false);
    });

    it('should validate if an object is not undefined', () => {
      expect(isUndefined({ test: 21 })).toBe(false);
    });
  });
});
