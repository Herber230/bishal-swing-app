import { useState } from 'react';
import { Switch } from '@nextui-org/switch';
import { ErrorLabel } from '@/components/atoms/error-label';
import { FormFieldWrap } from '@/components/atoms/form-field-wrap';

import type { SwitchInputFormFieldProps } from './switch-input-form-field.types';

export function NonCtrlSwitchInputFormField({
  name,
  externalError,
  defaultSelected = false,
  label,
  value,
  onChange,
}: SwitchInputFormFieldProps): JSX.Element {
  return (
    <FormFieldWrap>
      <div className="flex justify-center">
        <small className="mt-1 mr-2">{label}</small>
        {/* Hack to attach an input value to the form since Switch is not attaching the raw input value */}
        <input
          className="hidden"
          type="checkbox"
          name={name}
          checked={value}
          onChange={() => {
            return;
          }}
        />
        <Switch
          defaultSelected={defaultSelected}
          isSelected={value}
          onValueChange={onChange}
        />
      </div>
      <ErrorLabel error={externalError} />
    </FormFieldWrap>
  );
}

export function SwitchInputFormField(
  props: Omit<SwitchInputFormFieldProps, 'value' | 'onChange'>,
): JSX.Element {
  const [value, setValue] = useState(false);

  return (
    <NonCtrlSwitchInputFormField {...props} value={value} onChange={setValue} />
  );
}
