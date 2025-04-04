export interface TranslationsHelper {
  // TODO: Remove this false positive eslint failure
  // eslint-disable-next-line no-unused-vars
  (key: string): string;
}

export interface GetServerTranslations {
  (): Promise<{ t: TranslationsHelper }>;
}
