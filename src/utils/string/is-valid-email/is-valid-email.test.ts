import { isValidEmail } from './is-valid-email';

describe('src:utils:string:is-valid-email', () => {
  test('It should return false when email is undefined', () => {
    expect(isValidEmail(undefined)).toBe(false);
  });

  test('It should return false when email is empty', () => {
    expect(isValidEmail('')).toBe(false);
  });

  test('It should return false when email is not valid', () => {
    expect(isValidEmail('test')).toBe(false);
  });

  test('It should return false when email is not valid', () => {
    expect(isValidEmail('test@')).toBe(false);
  });

  test('It should return false when email is not valid', () => {
    expect(isValidEmail('test@test')).toBe(false);
  });

  test('It should return false when email is not valid', () => {
    expect(isValidEmail('test@test.')).toBe(false);
  });

  test('It should return true when email is valid', () => {
    expect(isValidEmail('test@domain.com')).toBe(true);
  });
});
