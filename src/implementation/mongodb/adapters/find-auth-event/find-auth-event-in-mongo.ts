import { Effect } from 'effect';
import { ReadError } from '@/impl-mongodb/errors';
import { BISHAL_AUTHENTICATION_EVENTS } from '@/impl-mongodb/constants/collections';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { MissingImplementationConfigError } from '@/repositories/errors/base-errors';
import { AuthenticationEvent } from '@/entities/authentication-event';
import getServerContext from '@/server-context/get';
import { authEventFromDocument } from '@/impl-mongodb/parsers/auth-event-from-document';
import { entityToSimpleFilters } from '@/impl-mongodb/parsers/entity-to-simple-filters';

export const findAuthEventInMongo = (params: Partial<AuthenticationEvent>) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;
    const database = implementationConfig['database'];

    if (!database)
      yield* Effect.fail(new MissingImplementationConfigError('database'));

    const db = getServerContext().mongoConnection.getClient().db(database);

    const document = yield* Effect.tryPromise({
      try: () =>
        db
          .collection(BISHAL_AUTHENTICATION_EVENTS)
          .findOne(entityToSimpleFilters(params)),
      catch: e => new ReadError(e),
    });

    return document ? authEventFromDocument(document) : undefined;
  });
