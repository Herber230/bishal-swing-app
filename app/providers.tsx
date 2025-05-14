'use client';

import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/system';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <ToastContainer />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
