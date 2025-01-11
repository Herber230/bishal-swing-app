'use server';

import { z } from 'zod';
import { Context, Effect, Option } from 'effect';
import { ServerActionResult } from '@/utils/next/types';
import { serverActionError } from '@/utils/next/server-action-error';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import {
  ForgotPasswordRepositoryInput,
  ForgotPasswordRepositoryInputTag,
} from '@/repositories/forgot-password-repository';
import { forgotPasswordUC } from '@/use-cases/forgot-passowrd';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { envConfig } from '@/server-context/env-config';
import { formDataToPlainObject } from '@/utils/form/form-data-to-plain-object';
import { FindUserByAccountTag } from '@/repositories/find-user-by-account-repository';
import { findUserByAccountInMongo } from '@/impl-mongodb/adapters/find-user-by-account';
import { CreateAuthenticationEventTag } from '@/repositories/create-authentication-event-repository';
import { createAuthEventInMongo } from '@/impl-mongodb/adapters/create-auth-event';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { commonBusiness } from '@/impl-common-business';
import { NotifyAuthenticationEventTag } from '@/repositories/notify-authentication-event';
import { notifyAuthEventThroughWhatsapp } from '@/impl-whatsapp-api/adapters/notify-auth-event';

const validateForm = (formData: FormData) =>
  formData.get('usePhone') === 'on'
    ? z
        .object({
          phone: z.string().min(1, 'Phone number is required'),
        })
        .safeParse(
          formDataToPlainObject(formData, {
            fieldTreatments: { phone: 'phone' },
          }),
        )
    : z
        .object({
          userName: z.string().min(1, 'User name is required'),
        })
        .safeParse(formDataToPlainObject(formData));

const composedUseCase = (params: ForgotPasswordRepositoryInput) =>
  Effect.provide(
    forgotPasswordUC,
    Context.empty().pipe(
      Context.add(ImplementationConfigTag, envConfig),
      Context.add(ForgotPasswordRepositoryInputTag, params),
      Context.add(FindUserByAccountTag, findUserByAccountInMongo),
      Context.add(CreateAuthenticationEventTag, createAuthEventInMongo),
      Context.add(CommonBusinessUtilsTag, commonBusiness),
      Context.add(NotifyAuthenticationEventTag, notifyAuthEventThroughWhatsapp),
    ),
  )
    .pipe(
      Effect.flatMap(() =>
        Effect.succeed(
          serverActionSuccess('Forgot password request successful'),
        ),
      ),
    )
    .pipe(
      Effect.catchSome(error => {
        switch (error._tag) {
          case 'AccountNotFoundError':
            return Option.some(
              Effect.succeed(
                serverActionError('Forgot password request failed', {
                  submit: ['Account not found'],
                }),
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
          serverActionError('Forgot password request failed', {
            submit: ['Unknown error. Please try again later'],
          }),
        ),
      ),
    );

export async function performForgotPasswordFromServer(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const validation = validateForm(formData);

  if (!validation.success)
    return serverActionError(
      'Forgot Password failed',
      validation.error?.flatten().fieldErrors,
    );

  return Effect.runPromise(composedUseCase(validation.data));
}
