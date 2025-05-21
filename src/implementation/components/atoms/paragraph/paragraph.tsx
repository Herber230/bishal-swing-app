import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ParagraphProps } from './paragraph.types';

export function Paragraph({
  children,
  className,
}: ParagraphProps): JSX.Element {
  return <p className={twMerge('font-secondary', className)}>{children}</p>;
}
