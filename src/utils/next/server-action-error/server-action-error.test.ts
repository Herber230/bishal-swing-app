import { serverActionError } from './server-action-error';

describe('src:utils:next:server-action-error', () => {
  test('It should return a ServerActionResult with sanitized errors', () => {
    const message = 'An error occurred';
    const errors = {
      field1: ['Error 1', 'Error 2'],
      field2: undefined,
      field3: ['Error 3'],
    };

    const result = serverActionError(message, errors);

    expect(result).toEqual({
      success: false,
      message,
      errors: {
        field1: ['Error 1', 'Error 2'],
        field3: ['Error 3'],
      },
    });
  });

  test('It should handle empty errors object', () => {
    const message = 'No errors';
    const result = serverActionError(message, {});

    expect(result).toEqual({
      success: false,
      message,
      errors: {},
    });
  });

  test('It should handle undefined errors parameter', () => {
    const message = 'No errors provided';
    const result = serverActionError(message);

    expect(result).toEqual({
      success: false,
      message,
      errors: {},
    });
  });
});
