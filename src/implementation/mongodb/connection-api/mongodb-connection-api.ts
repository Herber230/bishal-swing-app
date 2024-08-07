// TODO: Register globalThis types
import type { MongoClient } from 'mongodb';
import type { MongoDbConnectionApi } from './mongodb-connection-api.types';

export function createMongoDbConnectionApi(): MongoDbConnectionApi {
  let client: MongoClient;

  return {
    getClient: () => client,
    initialize: async () => {
      const mongodb = await import('mongodb');
      const uri = process.env.MONGO_CONNECTION_URI;
      const options = {
        serverApi: {
          version: mongodb.ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      };

      if (!uri) {
        // This is a critical error. If the connection URI is not set let the developer know.
        throw new Error('MONGO_CONNECTION_URI is not set');
      }

      if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        // eslint-disable-next-line no-undef
        let globalWithMongo = global as typeof globalThis & {
          _mongoClient?: MongoClient;
        };

        if (!globalWithMongo._mongoClient) {
          globalWithMongo._mongoClient = new mongodb.MongoClient(uri, options);
        }
        client = globalWithMongo._mongoClient;
      } else {
        // In production mode, it's best to not use a global variable.
        client = new mongodb.MongoClient(uri, options);
      }
    },
  };
}
