// TODO: Register globalThis types
/* eslint-disable no-undef */
import type { ServerContext } from './server-context.types';

export default function getServerContext<T>(caller: T): ServerContext {
  // @ts-ignore
  if (!globalThis.initializeServerContext) {
    throw new Error('Server context is not initialized yet');
  }

  // @ts-ignore
  return globalThis.initializeServerContext(caller);
}
