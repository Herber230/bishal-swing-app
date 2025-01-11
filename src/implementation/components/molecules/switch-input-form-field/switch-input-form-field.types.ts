export interface SwitchInputFormFieldProps {
  name: string;
  label: string;
  value: boolean;
  // TODO: Fix this false positive
  // eslint-disable-next-line no-unused-vars
  onChange: (value: boolean) => void;
  externalError?: string;
  defaultSelected?: boolean;
}
