import { requiredOrThrow } from './required-or-throw';

describe('src:utils:string:required-or-throw', () => {
  test('It should throw an error when value is undefined', () => {
    expect(() => requiredOrThrow('key', undefined)).toThrow(
      'key is a required value.',
    );
  });

  test('It should throw an error when value is null', () => {
    expect(() => requiredOrThrow('key', null)).toThrow(
      'key is a required value.',
    );
  });

  test('It should throw an error when value is not a string', () => {
    expect(() => requiredOrThrow('key', 1)).toThrow('key is a required value.');
  });

  test('It should return the value when value is a string', () => {
    expect(requiredOrThrow('key', 'value')).toBe('value');
  });
});
