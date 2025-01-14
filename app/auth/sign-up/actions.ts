'use server';

import { z } from 'zod';
import { Effect, Context, Option } from 'effect';
import { signUpNoVerifiedAccountUC } from '@/use-cases/sign-up-no-verified-account';
import {
  SignUpNoVerifiedAccountInput,
  SignUpNoVerifiedAccountInputTag,
} from '@/repositories/sign-up-no-verified-account-repository';
import { createUserInMongo } from '@/impl-mongodb/adapters/create-user';
import { createAuthEventInMongo } from '@/impl-mongodb/adapters/create-auth-event';
import { findUserByAccountInMongo } from '@/impl-mongodb/adapters/find-user-by-account';
import { notifyAuthEventThroughWhatsapp } from '@/impl-whatsapp-api/adapters/notify-auth-event';
import { commonBusiness } from '@/impl-common-business';
import { serverActionError } from '@/utils/next/server-action-error';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import { ServerActionResult } from '@/utils/next/types';
import { formDataToPlainObject } from '@/utils/form/form-data-to-plain-object';
import { FindUserByAccountTag } from '@/repositories/find-user-by-account-repository';
import { CreateUserTag } from '@/repositories/create-user-repository';
import { CreateAuthenticationEventTag } from '@/repositories/create-authentication-event-repository';
import { NotifyAuthenticationEventTag } from '@/repositories/notify-authentication-event';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { envConfig } from '@/server-context/env-config';

const validateForm = (formData: FormData) => {
  // Create a schema for the form data
  const signUpSchema = z.object({
    userName: z.string().min(4, 'Username must be at least 3 characters long'),
    phone: z.string().min(8, 'Phone number must be at least 8 characters long'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at most 20 characters long')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
        'Password must contain at least one letter, one number and one special character',
      ),
    confirmPassword: z.string(),
  });

  // Extract the form data as a plain object
  const treatedFormData = formDataToPlainObject(formData, {
    fieldTreatments: { phone: 'phone' },
  });

  // Validate
  return signUpSchema.safeParse(treatedFormData);
};

const composedUseCase = (params: SignUpNoVerifiedAccountInput) =>
  Effect.provide(
    signUpNoVerifiedAccountUC,
    Context.empty().pipe(
      Context.add(ImplementationConfigTag, envConfig),
      Context.add(SignUpNoVerifiedAccountInputTag, params),
      Context.add(FindUserByAccountTag, findUserByAccountInMongo),
      Context.add(CreateUserTag, createUserInMongo),
      Context.add(CreateAuthenticationEventTag, createAuthEventInMongo),
      Context.add(NotifyAuthenticationEventTag, notifyAuthEventThroughWhatsapp),
      Context.add(CommonBusinessUtilsTag, commonBusiness),
    ),
  )
    .pipe(
      Effect.flatMap(() =>
        Effect.succeed(
          serverActionSuccess(
            'New account created successfully. Verification is pending.',
          ),
        ),
      ),
    )
    .pipe(
      Effect.catchSome(error => {
        switch (error._tag) {
          case 'DuplicatedAccountError':
            return Option.some(
              Effect.succeed(
                serverActionError('New account creation failed', {
                  submit: ['Account already exists'],
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
          serverActionError('New account creation failed', {
            submit: ['Unknown error. Please try again '],
          }),
        ),
      ),
    );

export async function performSignUpFromServer(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const validation = validateForm(formData);

  if (!validation.success)
    return serverActionError(
      'New account creation failed',
      validation.error.flatten().fieldErrors,
    );

  if (formData.get('password') !== formData.get('confirmPassword'))
    return serverActionError('New account creation failed', {
      confirmPassword: ['Passwords do not match'],
    });

  return Effect.runPromise(composedUseCase(validation.data));
}
