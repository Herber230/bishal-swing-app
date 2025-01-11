import type { FormFieldWrapProps } from './form-field-wrap.types';

export function FormFieldWrap({
  children,
  className = 'mb-2',
}: FormFieldWrapProps): JSX.Element {
  return <div className={className}>{children}</div>;
}
