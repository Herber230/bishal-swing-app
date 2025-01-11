export function requiredOrThrow(
  key: string,
  value: unknown,
  message?: string,
): string {
  if (!message) message = `${key} is a required value.`;

  if (value == null || typeof value !== 'string') throw new Error(message);

  return value;
}
