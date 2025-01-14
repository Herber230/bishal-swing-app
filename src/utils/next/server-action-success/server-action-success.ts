import { ServerActionResult } from '../types';

export function serverActionSuccess(message: string): ServerActionResult {
  return {
    success: true,
    message,
    errors: {},
  };
}
