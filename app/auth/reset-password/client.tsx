'use client';
import { Authentication } from '@/components/organisms/authentication';
import { resetPasswordFromServer } from './actions';

import type { JSX } from 'react';

export interface AuthenticationWithResetPasswordContextProps {
  token: string;
}

export function AuthenticationWithResetPasswordContext({
  token,
}: AuthenticationWithResetPasswordContextProps): JSX.Element {
  const serverAction = resetPasswordFromServer.bind(null, token);

  return (
    <Authentication
      className="mx-auto"
      state="resetPassword"
      // False positive for bound function
      // @ts-ignore
      serverAction={serverAction}
    />
  );
}
