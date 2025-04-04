'use server';

import { commonBusiness } from '@/impl-common/business-utils';
import { findAuthEventInMongo } from '@/impl-mongodb/adapters/find-auth-event';
import { findUserInMongo } from '@/impl-mongodb/adapters/find-user';
import { updateUserInMongo } from '@/impl-mongodb/adapters/update-user';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { FindAuthEventTag } from '@/repositories/find-auth-event-repository';
import { FindUserTag } from '@/repositories/find-user-repository';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import {
  ResetPasswordRepositoryInput,
  ResetPasswordRepositoryInputTag,
} from '@/repositories/reset-password-repository';
import { UpdateUserTag } from '@/repositories/update-user-repository';
import {
  VerifyForgotPasswordTokenInput,
  VerifyForgotPasswordTokenInputTag,
} from '@/repositories/verify-forgot-password-token-repository';
import { envConfig } from '@/server-context/env-config';
import { resetPasswordUC } from '@/use-cases/reset-password';
import { verifyForgotPasswordTokenUC } from '@/use-cases/verify-forgot-password-token';
import { serverActionError } from '@/utils/next/server-action-error';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import { ServerActionResult } from '@/utils/next/types';
import { Context, Effect, Option } from 'effect';
import { z } from 'zod';
import {
  getServerTranslations,
  type TranslationsHelper,
} from '@/utils/i18n/get-server-translations';

const validateForm = (formData: FormData, t: TranslationsHelper) => {
  const resetPasswordSchema = z.object({
    password: z
      .string({
        required_error: t('authentication.notification.passwordRequired'),
      })
      .min(6, t('authentication.notification.passwordTooShort'))
      .max(20, t('authentication.notification.passwordTooLong'))
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
        t('authentication.notification.passwordInvalid'),
      ),
    confirmPassword: z.string({
      required_error: t('authentication.notification.confirmPasswordRequired'),
    }),
  });

  return resetPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
};

const composedResetPasswordUC = (
  input: ResetPasswordRepositoryInput,
  t: TranslationsHelper,
) =>
  Effect.provide(
    resetPasswordUC,
    Context.empty().pipe(
      Context.add(ImplementationConfigTag, envConfig),
      Context.add(ResetPasswordRepositoryInputTag, input),
      Context.add(FindAuthEventTag, findAuthEventInMongo),
      Context.add(FindUserTag, findUserInMongo),
      Context.add(UpdateUserTag, updateUserInMongo),
      Context.add(CommonBusinessUtilsTag, commonBusiness),
    ),
  )
    .pipe(
      Effect.flatMap(() =>
        Effect.succeed(
          serverActionSuccess(
            `${t('authentication.resetPassword.successNotification')}. ${t('authentication.resetPassword.youCanNowSignIn')}`,
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
                  `${t('authentication.notification.resetPasswordFailed')}. ${t('authentication.notification.accountNotFound')}`,
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
          serverActionError(
            `${t('authentication.notification.resetPasswordFailed')}. ${t('authentication.notification.unknownError')}`,
          ),
        ),
      ),
    );

export async function resetPasswordFromServer(
  token: string,
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const { t } = await getServerTranslations();
  const validation = validateForm(formData, t);

  if (!validation.success)
    return serverActionError(
      t('authentication.notification.resetPasswordFailed'),
      validation.error?.flatten().fieldErrors,
    );

  if (formData.get('password') !== formData.get('confirmPassword'))
    return serverActionError(
      t('authentication.notification.resetPasswordFailed'),
      {
        confirmPassword: [t('authentication.notification.passwordsDoNotMatch')],
      },
    );

  return Effect.runPromise(
    composedResetPasswordUC(
      {
        newPassword: validation.data.password,
        token,
      },
      t,
    ),
  );
}

const composedVerifyTokenUC = (
  input: VerifyForgotPasswordTokenInput,
  t: TranslationsHelper,
) =>
  Effect.provide(
    verifyForgotPasswordTokenUC,
    Context.empty().pipe(
      Context.add(ImplementationConfigTag, envConfig),
      Context.add(VerifyForgotPasswordTokenInputTag, input),
      Context.add(FindAuthEventTag, findAuthEventInMongo),
      Context.add(CommonBusinessUtilsTag, commonBusiness),
    ),
  )
    .pipe(
      Effect.flatMap(() =>
        Effect.succeed(
          serverActionSuccess(t('authentication.resetPassword.tokenVerified')),
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
                  t('authentication.notification.accountNotFound'),
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

export async function verifyForgotPasswordTokenFromServer(
  token: string,
): Promise<ServerActionResult> {
  const { t } = await getServerTranslations();

  return Effect.runPromise(composedVerifyTokenUC({ token }, t));
}
