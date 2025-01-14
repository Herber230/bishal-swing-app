'use server';

import { commonBusiness } from '@/impl-common-business';
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

const validateForm = (formData: FormData) => {
  const resetPasswordSchema = z.object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at most 20 characters long')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
        'Password must contain at least one letter, one number and one special character',
      ),
    confirmPassword: z.string().min(1),
  });

  return resetPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
};

const composedResetPasswordUC = (input: ResetPasswordRepositoryInput) =>
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
            'Password reset successful. You can now sign in with your new password.',
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
                serverActionError('Cannot reset password. Account not found.'),
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
          serverActionError('Cannot reset password. Unknown error.'),
        ),
      ),
    );

export async function resetPasswordFromServer(
  token: string,
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const validation = validateForm(formData);

  if (!validation.success)
    return serverActionError(
      'Reset password failed',
      validation.error?.flatten().fieldErrors,
    );

  if (formData.get('password') !== formData.get('confirmPassword'))
    return serverActionError('Reset password failed', {
      confirmPassword: ['Passwords do not match'],
    });

  return Effect.runPromise(
    composedResetPasswordUC({
      newPassword: validation.data.password,
      token,
    }),
  );
}

const composedVerifyTokenUC = (input: VerifyForgotPasswordTokenInput) =>
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
          serverActionSuccess(
            'Forgot password token verified. You can now reset your password.',
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
                serverActionError('Cannot reset password. Account not found.'),
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
          serverActionError('Cannot reset password. Unknown error.'),
        ),
      ),
    );

export async function verifyForgotPasswordTokenFromServer(
  token: string,
): Promise<ServerActionResult> {
  return Effect.runPromise(composedVerifyTokenUC({ token }));
}
