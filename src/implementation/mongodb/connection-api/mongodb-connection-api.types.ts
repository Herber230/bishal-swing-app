import type { MongoClient } from 'mongodb';

export interface MongoDbConnectionApi {
  getClient: () => MongoClient;
  initialize: () => Promise<void>;
}
