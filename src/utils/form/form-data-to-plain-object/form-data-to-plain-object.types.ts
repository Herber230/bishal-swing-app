export type FieldTreatment = 'phone';

export interface FormDataToPlainObjectOptions {
  fieldTreatments?: Record<string, FieldTreatment>;
}
