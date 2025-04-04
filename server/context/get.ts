// TODO: Register globalThis types
/* eslint-disable no-undef */
import type { ServerContext } from './types';

export default function getServerContext(): ServerContext {
  // @ts-ignore
  if (!globalThis.getServerContextInstance) {
    throw new Error('Server context is not initialized yet');
  }

  // @ts-ignore
  return globalThis.getServerContextInstance();
}
