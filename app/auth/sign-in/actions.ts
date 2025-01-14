'use server';

import { z } from 'zod';
import { signIn, BSCredentialsProviderError } from '@/auth';
import { serverActionError } from '@/utils/next/server-action-error';
import { formDataToPlainObject } from '@/utils/form/form-data-to-plain-object';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import { isRedirectError } from 'next/dist/client/components/redirect';

const validateForm = (formData: FormData) => {
  const usePhone = formData.get('usePhone') === 'on';

  // Create a schema for the form data
  const schema = z.object(
    usePhone
      ? {
          phone: z.string().min(1, 'Phone number is required'),
          password: z.string().min(1, 'Password is required'),
        }
      : {
          userName: z.string().min(1, 'User name is required'),
          password: z.string().min(1, 'Password is required'),
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
  const validation = validateForm(formData);

  if (!validation.success)
    return serverActionError(
      'Log In failed',
      validation.error?.flatten().fieldErrors,
    );

  // It is necessary to use ths try-catch block to handle the error since
  // it is the way auth.js interacts with the server
  try {
    await signIn('credentials', formData);
    return serverActionSuccess('Log In successful');
  } catch (e) {
    if (isRedirectError(e)) throw e;

    return serverActionError('Log In failed', {
      submit: [
        e instanceof BSCredentialsProviderError
          ? e.friendlyMessage
          : 'Unknown Error. Please try again later.',
      ],
    });
  }
}
