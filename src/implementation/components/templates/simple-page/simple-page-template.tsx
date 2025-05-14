import type { SimplePageTemplateProps } from './simple-page-template.types';

export function SimplePageTemplate({
  header,
  children,
  footer,
}: SimplePageTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {header}
      <main className="grow flex items-center justify-center flex-col">
        {children}
      </main>
      {footer}
    </div>
  );
}
