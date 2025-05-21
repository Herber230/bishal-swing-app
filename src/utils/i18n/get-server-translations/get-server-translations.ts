import { getMessages } from 'next-intl/server';
import type { GetServerTranslations } from './get-server-translations.types';
import { AbstractIntlMessages } from 'next-intl';

export const getServerTranslations: GetServerTranslations = async params => {
  const { ns } = params || {};
  const messages = await getMessages();

  return {
    t: key => {
      const completeKey = ns ? `${ns}.${key}` : key;
      const possibleValue = completeKey.split('.').reduce(
        (acc, part) => {
          if (acc && typeof acc === 'object') {
            return acc[part];
          }
          return null;
        },
        messages as AbstractIntlMessages | null | string,
      );

      if (typeof possibleValue === 'string') {
        return possibleValue;
      }

      throw new Error(
        `Key [${completeKey}] not found as a valid string in translations`,
      );
    },
  };
};
