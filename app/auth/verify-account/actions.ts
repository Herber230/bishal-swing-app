'use server';

import { Effect, Context, Option } from 'effect';
import { ServerActionResult } from '@/utils/next/types';

import { verifyAccountWithTokenUC } from '@/use-cases/verify-account-with-token';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { envConfig } from '@/server-context/env-config';
import { VerifyAccountWithTokenInputTag } from '@/repositories/verify-account-with-token-repository';
import { FindAuthEventTag } from '@/repositories/find-auth-event-repository';
import { findAuthEventInMongo } from '@/impl-mongodb/adapters/find-auth-event';
import { FindUserTag } from '@/repositories/find-user-repository';
import { findUserInMongo } from '@/impl-mongodb/adapters/find-user';
import { UpdateUserTag } from '@/repositories/update-user-repository';
import { updateUserInMongo } from '@/impl-mongodb/adapters/update-user';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import { serverActionError } from '@/utils/next/server-action-error';

const composedUseCase = (token: string) =>
  Effect.provide(
    verifyAccountWithTokenUC,
    Context.empty().pipe(
      Context.add(ImplementationConfigTag, envConfig),
      Context.add(VerifyAccountWithTokenInputTag, { token }),
      Context.add(FindAuthEventTag, findAuthEventInMongo),
      Context.add(FindUserTag, findUserInMongo),
      Context.add(UpdateUserTag, updateUserInMongo),
    ),
  )
    .pipe(
      Effect.flatMap(() =>
        Effect.succeed(serverActionSuccess('Account verified successfully')),
      ),
    )
    .pipe(
      Effect.catchSome(error => {
        switch (error._tag) {
          case 'AccountNotFoundError':
            return Option.some(
              Effect.succeed(serverActionError('Account not found')),
            );
          case 'AccountAlreadyVerifiedError':
            return Option.some(
              Effect.succeed(serverActionSuccess('Account already verified')),
            );
          default:
            return Option.none();
        }
      }),
    )
    .pipe(
      Effect.catchAll(() =>
        Effect.succeed(
          serverActionError('Unknown error occurred. Please try again later.'),
        ),
      ),
    );

export async function performVerificationFromServer(
  token: string,
): Promise<ServerActionResult> {
  return Effect.runPromise(composedUseCase(token));
}
