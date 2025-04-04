'use client';

import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/system';
import { ToastContainer } from 'react-toastify';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <ToastContainer />
      {children}
    </HeroUIProvider>
  );
}
