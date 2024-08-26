'use server';

import { serverActionSuccess } from '@/utils/next/server-action-success';
import { ServerActionResult } from '@/utils/next/types';
import { z } from 'zod';

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

export async function resetPasswordFromServer(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResult> {
  const validation = resetPasswordSchema.safeParse({
    emailOrUserName: formData.get('emailOrUserName'),
    password: formData.get('password'),
  });

  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };

  return serverActionSuccess();
}
