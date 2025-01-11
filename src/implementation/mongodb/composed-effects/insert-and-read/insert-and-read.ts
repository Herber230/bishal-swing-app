import { Effect } from 'effect';
import { Document, WithId, WithoutId } from 'mongodb';
import { ReadError, WriteError } from '@/impl-mongodb/errors';
import getServerContext from '@/server-context/get';
import { MissingImplementationConfigError } from '@/repositories/errors/base-errors';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';

export const insertAndRead = <TEntity extends WithoutId<Document>>(
  collectionName: string,
  entity: Omit<TEntity, 'id'>,
  // TODO: Solve eslint false positive
  // eslint-disable-next-line no-unused-vars
  parser: (docResult: WithId<Document>) => TEntity,
) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;
    const database = implementationConfig['database'];

    if (!database)
      yield* Effect.fail(new MissingImplementationConfigError('database'));

    const db = getServerContext().mongoConnection.getClient().db(database);

    const insertResult = yield* Effect.tryPromise({
      try: () => db.collection(collectionName).insertOne(entity),
      catch: e => new WriteError(e),
    });

    const reloadResult = yield* Effect.tryPromise({
      try: () =>
        db.collection(collectionName).findOne({ _id: insertResult.insertedId }),
      catch: e => new ReadError(e),
    });

    if (!reloadResult || !reloadResult._id)
      yield* Effect.fail(
        new ReadError('Mismatch in inserted and fetched document'),
      );

    return parser(reloadResult as WithId<Document>);
  });
