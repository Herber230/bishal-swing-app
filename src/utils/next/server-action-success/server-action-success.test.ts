import { serverActionSuccess } from './server-action-success';

describe('src:utils:next:server-action-success', () => {
  test('It should return a ServerActionResult with success true', () => {
    const message = 'Action completed successfully';
    const result = serverActionSuccess(message);

    expect(result).toEqual({
      success: true,
      message,
      errors: {},
    });
  });

  test('It should handle empty message', () => {
    const message = '';
    const result = serverActionSuccess(message);

    expect(result).toEqual({
      success: true,
      message,
      errors: {},
    });
  });
});
