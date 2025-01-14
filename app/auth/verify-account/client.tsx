'use client';

import { useEffect } from 'react';
import { showToast } from '@/utils/ui/toast';
import { useRouter } from 'next/navigation';
import { performVerificationFromServer } from './actions';

export function VerifyToken({ token }: { token: string }): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    performVerificationFromServer(token).then(result => {
      showToast(result.success ? 'success' : 'error', result.message);
      if (result.success) router.push('/auth/sign-in');
    });
  }, [router, token]);

  return <></>;
}
