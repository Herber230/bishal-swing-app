import { CreateUserRepository } from '@/repositories/create-user-repository';
import { userFromDocument } from '@/impl-mongodb/parsers/user-from-document';
import { ServerContext } from '@/server-context/server-context.types';
import { Document, ObjectId, WithId } from 'mongodb';
import { ReadError, WriteError } from '@/impl-mongodb/errors';
import getServerContext from '@/server-context/get';
import { User } from '@/entities/user';
import { Effect, pipe } from 'effect';

const createDocument = (userWithoutId: Omit<User, 'id'>) =>
  Effect.tryPromise({
    try: async () => {
      const serverContext: ServerContext = getServerContext(createUserInMongo);
      const client = serverContext.mongoConnection.getClient();
      //TODO: Specify the database as default in some configuration or as part of the server context
      const db = client.db('bishal-swing-app-dev');

      const insertResult = await db
        .collection('bishal_users')
        .insertOne(userWithoutId);
      return insertResult.insertedId;
    },
    catch: e => new WriteError(e),
  });

const loadCreatedDocument = Effect.flatMap((insertedId: ObjectId) =>
  Effect.tryPromise({
    try: async () => {
      const serverContext: ServerContext = getServerContext(createUserInMongo);
      const client = serverContext.mongoConnection.getClient();
      //TODO: Specify the database as default in some configuration or as part of the server context
      const db = client.db('bishal-swing-app-dev');

      return db.collection('bishal_users').findOne({ _id: insertedId });
    },
    catch: e => new ReadError(e),
  }),
);

const parseDocument = Effect.flatMap((docResult: WithId<Document> | null) => {
  return docResult
    ? Effect.succeed(userFromDocument(docResult))
    : Effect.fail(new ReadError('Mismatch in inserted and fetched document'));
});

export const createUserInMongo: CreateUserRepository = (
  userWithoutId: Omit<User, 'id'>,
) => pipe(createDocument(userWithoutId), loadCreatedDocument, parseDocument);
