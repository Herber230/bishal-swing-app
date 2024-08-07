export function assert(e: unknown): Error {
  if (e instanceof Error) {
    return e;
  }

  if (typeof e === 'string') {
    return new Error(e);
  }

  if (e instanceof Object && e !== null) {
    if ('message' in e && typeof e.message === 'string')
      return new Error(e.message);

    return new Error(e.toString());
  }

  return new Error('Unknown Error');
}
