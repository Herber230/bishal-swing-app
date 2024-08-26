import { ServerActionResult } from '../types';

export function serverActionSuccess(): ServerActionResult {
  return {
    success: true,
    errors: {},
  };
}
