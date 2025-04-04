import type { ReactNode } from 'react';

export interface SimplePageTemplateProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}
