import type { MongoClient } from 'mongodb';
import type {
  MongoDbConnectionApi,
  CreateMongoDbConnectionApiParams,
} from './mongodb-connection-api.types';

export function createMongoDbConnectionApi({
  mongoConnectionUri,
  nodeEnv,
}: CreateMongoDbConnectionApiParams): MongoDbConnectionApi {
  let client: MongoClient;

  return {
    getClient: () => client,
    initialize: async () => {
      const mongodb = await import('mongodb');
      const options = {
        serverApi: {
          version: mongodb.ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      };

      if (nodeEnv === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        // eslint-disable-next-line no-undef
        let globalWithMongo = global as typeof globalThis & {
          _mongoClient?: MongoClient;
        };

        if (!globalWithMongo._mongoClient) {
          globalWithMongo._mongoClient = new mongodb.MongoClient(
            mongoConnectionUri,
            options,
          );
        }
        client = globalWithMongo._mongoClient;
      } else {
        // In production mode, it's best to not use a global variable.
        client = new mongodb.MongoClient(mongoConnectionUri, options);
      }
    },
  };
}
