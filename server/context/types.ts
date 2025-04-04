import type { MongoDbConnectionApi } from '@/impl-mongodb/connection-api';

export type ServerContext = {
  mongoConnection: MongoDbConnectionApi;
};
