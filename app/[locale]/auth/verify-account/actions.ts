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
import {
  getServerTranslations,
  TranslationsHelper,
} from '@/utils/i18n/get-server-translations';

const composedUseCase = (token: string, t: TranslationsHelper) =>
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
        Effect.succeed(
          serverActionSuccess(
            t('authentication.verifyAccount.successNotification'),
          ),
        ),
      ),
    )
    .pipe(
      Effect.catchSome(error => {
        switch (error._tag) {
          case 'AccountNotFoundError':
            return Option.some(
              Effect.succeed(
                serverActionError(
                  t('authentication.notifications.accountNotFound'),
                ),
              ),
            );
          case 'AccountAlreadyVerifiedError':
            return Option.some(
              Effect.succeed(
                serverActionSuccess(
                  t('authentication.notifications.accountAlreadyVerified'),
                ),
              ),
            );
          default:
            return Option.none();
        }
      }),
    )
    .pipe(
      Effect.catchAll(() =>
        Effect.succeed(
          serverActionError(t('authentication.notification.unknownError')),
        ),
      ),
    );

export async function performVerificationFromServer(
  token: string,
): Promise<ServerActionResult> {
  const { t } = await getServerTranslations();

  return Effect.runPromise(composedUseCase(token, t));
}
