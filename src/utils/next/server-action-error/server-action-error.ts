import { ServerActionResult } from '../types';

export function serverActionError(
  message: string,
  errors?: Record<string, string[] | undefined>,
): ServerActionResult {
  const sanitizedErrors: Record<string, string[]> = {};
  Object.entries(errors ?? {}).forEach(([key, value]) => {
    if (value) sanitizedErrors[key] = value;
  });

  return {
    success: false,
    message,
    errors: sanitizedErrors,
  };
}
