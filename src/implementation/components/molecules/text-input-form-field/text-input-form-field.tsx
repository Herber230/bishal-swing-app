import { Input } from '@nextui-org/input';
import { Label } from '@/components/atoms/label';
import { ErrorLabel } from '@/components/atoms/error-label';
import { FormFieldWrap } from '@/components/atoms/form-field-wrap';

import type { TextInputFormFieldProps } from './text-input-form-field.types';

export function TextInputFormField({
  label,
  externalError,
  name,
  type = 'text',
}: TextInputFormFieldProps) {
  return (
    <FormFieldWrap>
      <Input name={name} type={type} label={<Label>{label}</Label>} />
      <ErrorLabel error={externalError} />
    </FormFieldWrap>
  );
}
