import './globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { LayoutClient } from './layout-client';

export const metadata: Metadata = {
  title: 'Bishal Swing',
  description: 'Salsa y Bachata en Xela',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <LayoutClient />
        {children}
      </body>
    </html>
  );
}
