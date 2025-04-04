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
import { commonBusiness } from '@/impl-common/business-utils';
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
import { envConfig } from '@/server-config';
import {
  getServerTranslations,
  TranslationsHelper,
} from '@/utils/i18n/get-server-translations';

const validateForm = (formData: FormData, t: TranslationsHelper) => {
  // Create a schema for the form data
  const signUpSchema = z.object({
    userName: z
      .string({
        required_error: t('authentication.notification.userNameRequired'),
      })
      .min(4, t('authentication.notification.userNameTooShort')),
    phone: z
      .string({
        required_error: t('authentication.notification.phoneNumberRequired'),
      })
      .min(8, t('authentication.notification.phoneNumberTooShort')),
    firstName: z.string({
      required_error: t('authentication.notification.firstNameRequired'),
    }),
    lastName: z.string({
      required_error: t('authentication.notification.lastNameRequired'),
    }),
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

  // Extract the form data as a plain object
  const treatedFormData = formDataToPlainObject(formData, {
    fieldTreatments: { phone: 'phone' },
  });

  // Validate
  return signUpSchema.safeParse(treatedFormData);
};

const composedUseCase = (
  params: SignUpNoVerifiedAccountInput,
  t: TranslationsHelper,
) =>
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
          serverActionSuccess(t('newAccountCreatedVerificationPending')),
        ),
      ),
    )
    .pipe(
      Effect.catchSome(error => {
        switch (error._tag) {
          case 'DuplicatedAccountError':
            return Option.some(
              Effect.succeed(
                serverActionError(
                  t('authentication.notification.newAccountCreationFailed'),
                  {
                    submit: [
                      t('authentication.notification.accountAlreadyExists'),
                    ],
                  },
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
            t('authentication.notification.newAccountCreationFailed'),
            {
              submit: [t('authentication.notification.unknownError')],
            },
          ),
        ),
      ),
    );

export async function performSignUpFromServer(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const { t } = await getServerTranslations();
  const validation = validateForm(formData, t);

  if (!validation.success)
    return serverActionError(
      t('authentication.notification.newAccountCreationFailed'),
      validation.error.flatten().fieldErrors,
    );

  if (formData.get('password') !== formData.get('confirmPassword'))
    return serverActionError(
      t('authentication.notification.newAccountCreationFailed'),
      {
        confirmPassword: [t('authentication.notification.passwordsDoNotMatch')],
      },
    );

  return Effect.runPromise(composedUseCase(validation.data, t));
}
