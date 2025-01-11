import { Effect } from 'effect';
import getServerContext from '@/server-context/get';
import { ReadError } from '@/impl-mongodb/errors';
import { userFromDocument } from '@/impl-mongodb/parsers/user-from-document';
import { BISHAL_USERS } from '@/impl-mongodb/constants/collections';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { MissingImplementationConfigError } from '@/repositories/errors/base-errors';
import { User } from '@/entities/user';
import { entityToSimpleFilters } from '@/impl-mongodb/parsers/entity-to-simple-filters';

export const findUserInMongo = (params: Partial<User>) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;
    const database = implementationConfig['database'];

    if (!database)
      yield* Effect.fail(new MissingImplementationConfigError('database'));

    const db = getServerContext().mongoConnection.getClient().db(database);

    const userDocument = yield* Effect.tryPromise({
      try: () =>
        db.collection(BISHAL_USERS).findOne(entityToSimpleFilters(params)),
      catch: e => new ReadError(e),
    });

    return userDocument ? userFromDocument(userDocument) : undefined;
  });
