import { Input } from '@heroui/input';
import { useState, type JSX } from 'react';
import InputMask from 'react-input-mask';
import { Label } from '@/components/atoms/label';
import { ErrorLabel } from '@/components/atoms/error-label';
import { FormFieldWrap } from '@/components/atoms/form-field-wrap';

import type { PhoneInputFormFieldProps } from './phone-input-form-field.types';

export function PhoneInputFormField({
  label = 'Phone Number',
  externalError,
  name = 'phone',
}: PhoneInputFormFieldProps): JSX.Element {
  const [value, setValue] = useState('');

  return (
    <FormFieldWrap>
      <InputMask
        mask="9999-9999"
        alwaysShowMask
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        <Input label={<Label>{label}</Label>} name={name} />
      </InputMask>
      <ErrorLabel error={externalError} />
    </FormFieldWrap>
  );
}
