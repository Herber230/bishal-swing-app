import { Effect } from 'effect';
import { FindUserByAccountParams } from '@/repositories/find-user-by-account-repository';
import getServerContext from '@/server-context/get';
import { ReadError } from '@/impl-mongodb/errors';
import { userFromDocument } from '@/impl-mongodb/parsers/user-from-document';
import { BISHAL_USERS } from '@/impl-mongodb/constants/collections';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { MissingImplementationConfigError } from '@/repositories/errors/base-errors';

const createFilters = ({
  type,
  identifier,
  userName,
  details,
}: FindUserByAccountParams) => {
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

export const findUserByAccountInMongo = (params: FindUserByAccountParams) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;
    const database = implementationConfig['database'];

    if (!database)
      yield* Effect.fail(new MissingImplementationConfigError('database'));

    const db = getServerContext().mongoConnection.getClient().db(database);

    const userDocument = yield* Effect.tryPromise({
      try: () => db.collection(BISHAL_USERS).findOne(createFilters(params)),
      catch: e => new ReadError(e),
    });

    return userDocument ? userFromDocument(userDocument) : undefined;
  });
