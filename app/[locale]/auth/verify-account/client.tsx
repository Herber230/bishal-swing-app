'use client';

import { useEffect, type JSX } from 'react';
import { showToast } from '@/utils/ui/toast';
import { useRouter } from 'next/navigation';
import { performVerificationFromServer } from './actions';

export function VerifyToken({ token }: { token: string }): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    performVerificationFromServer(token).then(result => {
      if (result.message)
        showToast(result.success ? 'success' : 'error', result.message);
      if (result.success) router.push('/auth/sign-in');
    });
  }, [router, token]);

  return <></>;
}
