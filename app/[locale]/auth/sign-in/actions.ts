'use server';

import { z } from 'zod';
import { signIn, BSCredentialsProviderError } from '@/auth';
import { serverActionError } from '@/utils/next/server-action-error';
import { formDataToPlainObject } from '@/utils/form/form-data-to-plain-object';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import {
  getServerTranslations,
  TranslationsHelper,
} from '@/utils/i18n/get-server-translations';

const validateForm = (formData: FormData, t: TranslationsHelper) => {
  const usePhone = formData.get('usePhone') === 'on';

  // Create a schema for the form data
  const schema = z.object(
    usePhone
      ? {
          phone: z.string({
            required_error: t(
              'authentication.notification.phoneNumberRequired',
            ),
          }),
          password: z.string({
            required_error: t('authentication.notification.passwordRequired'),
          }),
        }
      : {
          userName: z.string({
            required_error: t('authentication.notification.userNameRequired'),
          }),
          password: z.string({
            required_error: t('authentication.notification.passwordRequired'),
          }),
        },
  );

  // Extract the form data as a plain object
  const treatedFormData = formDataToPlainObject(formData, {
    fieldTreatments: { phone: 'phone' },
  });

  // Validate
  return schema.safeParse(treatedFormData);
};

export async function performSignInFromServer(_: unknown, formData: FormData) {
  const { t } = await getServerTranslations();
  const validation = validateForm(formData, t);

  if (!validation.success)
    return serverActionError(
      t('authentication.notification.logInFailed'),
      validation.error?.flatten().fieldErrors,
    );

  // It is necessary to use ths try-catch block to handle the error since
  // it is the way auth.js interacts with the server, throwing errors
  try {
    await signIn('credentials', formData);
    return serverActionSuccess(
      t('authentication.notification.logInSuccessful'),
    );
  } catch (e) {
    // This is an special case, we need to throw it to push the state to next router
    // Probably a better way to check the error type. But it is the only way so far
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') throw e;

    return serverActionError(t('authentication.notification.logInFailed'), {
      submit: [
        e instanceof BSCredentialsProviderError
          ? t(`authentication.notification.${e.friendlyMessageKey}`)
          : t('authentication.notification.unknownError'),
      ],
    });
  }
}
