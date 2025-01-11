export interface TextInputFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'password';
  externalError?: string | string[];
}
