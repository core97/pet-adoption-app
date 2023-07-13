import { Country } from '@country/model';
import { validateMultiLanguages } from '@shared/domain/languages';
import { ConflictError } from '@shared/application/errors/conflict.error';

export const validateCountry = (country: Partial<Country>) => {
  if (country.name) {
    validateMultiLanguages(country.name);
  }

  if (country.isoCode && country.isoCode.length !== 2) {
    throw new ConflictError('Invalid iso code for country');
  }
};
