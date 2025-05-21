export interface TranslationsHelper {
  // TODO: Remove this false positive eslint failure
  // eslint-disable-next-line no-unused-vars
  (key: string): string;
}

export interface GetServerTranslationsParams {
  ns?: string;
}

export interface GetServerTranslations {
  // TODO: Remove this false positive eslint failure
  // eslint-disable-next-line no-unused-vars
  (params?: GetServerTranslationsParams): Promise<{ t: TranslationsHelper }>;
}
