import type {
  FormDataToPlainObjectOptions,
  FieldTreatment,
} from './form-data-to-plain-object.types';

const checkForTreatment = (
  key: string,
  value: FormDataEntryValue,
  treatments: Record<string, FieldTreatment>,
): string | undefined => {
  if (!value || value instanceof File) {
    // File is not supported yet
    return undefined;
  }

  switch (treatments[key]) {
    case 'phone':
      return value.replace(/\D/g, '');
    default:
      return value;
  }
};

export function formDataToPlainObject(
  formData: FormData,
  options?: FormDataToPlainObjectOptions,
): Record<string, string | undefined> {
  const { fieldTreatments = {} } = options || {};

  return Object.fromEntries(
    formData
      .entries()
      .map(([key, value]) => [
        key,
        checkForTreatment(key, value, fieldTreatments),
      ]),
  );
}
