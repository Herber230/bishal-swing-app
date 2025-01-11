import type { MongoClient } from 'mongodb';

export interface CreateMongoDbConnectionApiParams {
  mongoConnectionUri: string;
  nodeEnv: string;
}

export interface MongoDbConnectionApi {
  getClient: () => MongoClient;
  initialize: () => Promise<void>;
}
