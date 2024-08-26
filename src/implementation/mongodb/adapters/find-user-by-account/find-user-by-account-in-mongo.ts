import { Document, WithId } from 'mongodb';
import { Effect, pipe } from 'effect';
import {
  FindUserByAccountRepository,
  FindUserByAccountRepositoryParams,
} from '@/repositories/find-user-by-account-repository';
import getServerContext from '@/server-context/get';
import { ReadError } from '@/impl-mongodb/errors';
import { ServerContext } from '@/server-context/server-context.types';
import { userFromDocument } from '@/impl-mongodb/parsers/user-from-document';

const createFilters = ({
  type,
  identifier,
  userName,
  details,
}: FindUserByAccountRepositoryParams) => {
  const filters: Record<string, any> = {};
  let elemMatch: Record<string, any> | undefined;

  if (userName) {
    filters.name = userName;
  }

  const accountFilters: Record<string, unknown> = { type, identifier, details };
  Object.keys(accountFilters)
    .filter(key => accountFilters[key])
    .forEach(key => {
      if (!elemMatch) elemMatch = {};
      elemMatch[key] = accountFilters[key];
    });

  if (elemMatch) {
    filters.accounts = { $elemMatch: elemMatch };
  }

  return filters;
};

const findDocument = (params: FindUserByAccountRepositoryParams) =>
  Effect.tryPromise({
    try: () => {
      const serverContext: ServerContext = getServerContext(
        findUserByAccountInMongo,
      );
      const client = serverContext.mongoConnection.getClient();
      //TODO: Specify the database as default in some configuration or as part of the server context
      const db = client.db('bishal-swing-app-dev');

      return db.collection('bishal_users').findOne(createFilters(params));
    },
    catch: e => new ReadError(e),
  });

const parseDocument = Effect.flatMap((docResult: WithId<Document> | null) => {
  const user = docResult ? userFromDocument(docResult) : undefined;
  return Effect.succeed(user);
});

export const findUserByAccountInMongo: FindUserByAccountRepository = (
  params: FindUserByAccountRepositoryParams,
) => pipe(findDocument(params), parseDocument);
