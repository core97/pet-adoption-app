import { Translation as TranslationPrisma } from '@prisma/client';

export type Translation = TranslationPrisma;

export enum Language {
  DE = 'DE',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  IT = 'IT',
  PT = 'PT',
}

export const validateMultiLanguages = (obj: any) => {
  if (typeof obj !== 'object') {
    throw new Error('Translations should be a object');
  }

  if (Object.keys(Language).length !== Object.keys(obj).length) {
    throw new Error('Translations have more fields than current languages');
  }

  const areValidTranslations = Object.keys(Language).every(
    key =>
      Object.keys(obj).includes(key.toLowerCase()) &&
      typeof obj[key.toLowerCase()] === 'string' &&
      obj[key.toLowerCase()]
  );

  if (!areValidTranslations) {
    throw new Error('Translations are invalid');
  }
};

export const isValidLanguage = (lang: any): lang is keyof Translation =>
  typeof lang === 'string' &&
  Object.values(Language).some(
    item => item.toLowerCase() === lang.toLowerCase()
  );
