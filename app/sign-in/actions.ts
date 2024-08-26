'use server';

import { ServerActionResult } from '@/utils/next/types';
import { z } from 'zod';
import { signIn } from '@/auth';
import { serverActionError } from '@/utils/next/server-action-error';
import { serverActionSuccess } from '@/utils/next/server-action-success';

const loginSchema = z.object({
  emailOrUserName: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function loginWithCredentialsFromServer(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  console.log('formData', formData);

  const validation = loginSchema.safeParse({
    emailOrUserName: formData.get('emailOrUserName'),
    password: formData.get('password'),
  });

  if (!validation.success)
    return serverActionError(validation.error?.flatten().fieldErrors);

  try {
    await signIn('credentials', formData);
    return serverActionSuccess();
  } catch {
    // TODO: Recognize the error and return a more specific error message
    // This should be by checking the effect result
    return serverActionError({
      submit: ['Cannot log in with the provided credentials'],
    });
  }
}
