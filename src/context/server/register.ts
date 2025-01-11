import type { ServerContext } from './server-context.types';
import { createMongoDbConnectionApi } from '@/impl-mongodb/connection-api';
import { envConfig } from './env-config';

// Initialize the MongoDB connection
const mongoConnectionApi = createMongoDbConnectionApi(envConfig);
mongoConnectionApi.initialize();

// Create the server context instance
const contextProvider: ServerContext = {
  mongoConnection: mongoConnectionApi,
};

// Attach a global function to get the server context instance
globalThis.getServerContextInstance = () => contextProvider;
