'use client';

import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
