import { ServerActionResult } from '../types';

export function serverActionError(
  errors?: Record<string, string[]>,
): ServerActionResult {
  return {
    success: false,
    errors: errors ?? {},
  };
}
