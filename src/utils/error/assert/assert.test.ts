import { assert } from './assert';

describe('src:utils:error:assert', () => {
  test('It should return the Error instance when this is passed', () => {
    const error = new Error('This is an error');
    expect(assert(error)).toBe(error);
  });

  test('It should return a new Error instance when a string is passed', () => {
    const error = 'This is an error';
    expect(assert(error)).toEqual(new Error(error));
  });

  test('It should return a new Error instance when an object with a message is passed', () => {
    const error = { message: 'This is an error' };
    expect(assert(error)).toEqual(new Error(error.message));
  });

  test('It should return a new Error instance when an object without a message is passed', () => {
    const error = { code: 404 };
    expect(assert(error)).toEqual(new Error(error.toString()));
  });
});
