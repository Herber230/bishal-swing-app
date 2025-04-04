import type { SimplePageTemplateProps } from './simple-page-template.types';

export function SimplePageTemplate({
  header,
  children,
  footer,
}: SimplePageTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {header}
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      {footer}
    </div>
  );
}
