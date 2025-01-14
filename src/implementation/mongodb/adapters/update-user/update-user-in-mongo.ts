import { Effect } from 'effect';
import getServerContext from '@/server-context/get';
import { ReadError, WriteError } from '@/impl-mongodb/errors';
import { userFromDocument } from '@/impl-mongodb/parsers/user-from-document';
import { BISHAL_USERS } from '@/impl-mongodb/constants/collections';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { MissingImplementationConfigError } from '@/repositories/errors/base-errors';
import { User } from '@/entities/user';
import { Document, ObjectId, WithId } from 'mongodb';

export const updateUserInMongo = (params: User) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;
    const database = implementationConfig['database'];

    if (!database)
      yield* Effect.fail(new MissingImplementationConfigError('database'));

    const db = getServerContext().mongoConnection.getClient().db(database);

    const { id, ...data } = params;
    const _id = ObjectId.createFromHexString(id as string);

    const updateResult = yield* Effect.tryPromise({
      try: () =>
        db.collection(BISHAL_USERS).replaceOne({ _id }, { ...data, _id }),
      catch: e => new WriteError(e),
    });

    if (!updateResult.acknowledged || updateResult.modifiedCount === 0)
      yield* Effect.fail(new WriteError('Update failed'));

    const reloadResult = yield* Effect.tryPromise({
      try: () => db.collection(BISHAL_USERS).findOne({ _id }),
      catch: e => new ReadError(e),
    });

    if (!reloadResult || !reloadResult._id)
      yield* Effect.fail(
        new ReadError('Mismatch in inserted and fetched document'),
      );

    return userFromDocument(reloadResult as WithId<Document>);
  });
