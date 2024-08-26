'use server';

import { findUserByAccountInMongo } from '@/impl-mongodb/adapters/find-user-by-account';
import { createUserInMongo } from '@/impl-mongodb/adapters/create-user';
import {
  SignUpUserRepository,
  SignUpUserRepositoryParams,
} from '@/repositories/sign-up-user-repository';
import { signUpUC } from '@/use-cases/sign-up';
import { serverActionError } from '@/utils/next/server-action-error';
import { serverActionSuccess } from '@/utils/next/server-action-success';
import { ServerActionResult } from '@/utils/next/types';
import { Effect } from 'effect';
import { z } from 'zod';

const signUpSchema = z.object({
  userName: z.string().min(4, 'Username must be at least 3 characters long'),
  email: z.string().email(),
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

const performSignUp = (params: SignUpUserRepositoryParams) => {
  // Compose Use Case with Repository
  const signUpAccountInMongo = Effect.provideService(
    signUpUC,
    SignUpUserRepository,
    {
      find: findUserByAccountInMongo,
      create: createUserInMongo,
      input: params,
    },
  );

  // Run the Use Case
  return Effect.runPromise(signUpAccountInMongo)
    .then(() => {
      console.log('[>>>>>>>] success');
      return serverActionSuccess();
    })
    .catch(e => {
      console.log('[>>>>>>>] error: ', e);
      return serverActionError();
    });
};

export async function createNewAccountInMongo(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const validation = signUpSchema.safeParse({
    userName: formData.get('userName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validation.success)
    return serverActionError(validation.error.flatten().fieldErrors);

  if (formData.get('password') !== formData.get('confirmPassword'))
    return serverActionError({ confirmPassword: ['Passwords do not match'] });

  const result = await performSignUp(
    validation.data as SignUpUserRepositoryParams,
  );
  return result;
}
