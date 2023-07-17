import { match } from '@formatjs/intl-localematcher';
import { Locale } from '@shared/domain/locale';

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/internationalization
 */

const getAcceptLangFromHeader = (acceptLanguages: string) => {
  const languages: string[] = [];
  const languageTags = acceptLanguages.split(',');

  languageTags.forEach(languageTag => {
    const parts = languageTag.trim().split(';');
    const qValue = parseFloat(parts[1] && parts[1].split('=')[1]) || 1;

    if (qValue >= 0.5 && parts[0] !== '*') {
      languages.push(parts[0].trim());
    }
  });

  return languages;
};

export const getLocale = (headers: Headers) => {
  const acceptLang = headers.get('accept-language');
  const availableLocales = Object.values(Locale);

  const defaultLocale = Locale.en;

  const locale = match(
    acceptLang ? getAcceptLangFromHeader(acceptLang) : [],
    availableLocales,
    defaultLocale
  );

  return locale;
};
