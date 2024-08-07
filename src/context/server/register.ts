// TODO: Register globalThis types
/* eslint-disable no-undef */
import type { ServerContext } from './server-context.types';
import { createMongoDbConnectionApi } from '@/impl-mongodb/connection-api';

const mongoConnectionApi = createMongoDbConnectionApi();
mongoConnectionApi.initialize();

const contextProvider: ServerContext = {
  mongoConnection: mongoConnectionApi,
};

// @ts-ignore
globalThis.initializeServerContext = () => contextProvider;
// @ts-ignore
globalThis.testObject = {
  foo: 'bar',
};
