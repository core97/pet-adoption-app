import { CountryIso as CountryIsoPrisma } from '@prisma/client';

export type CountryIso = CountryIsoPrisma;

export const COUNTRY_ISO: Record<CountryIso, CountryIso> = {
  ES: 'ES',
};

export const isValidCountryIso = (countryIso: any): countryIso is CountryIso =>
  typeof countryIso === 'string' &&
  Object.values(COUNTRY_ISO).some(item => item === countryIso);
