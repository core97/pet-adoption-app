import { Locale } from '@shared/domain/locale';

export const getDictionary = async (locale: Locale) =>
  import(`dictionaries/${locale.toLowerCase()}.json`).then(
    module => module.default
  );
