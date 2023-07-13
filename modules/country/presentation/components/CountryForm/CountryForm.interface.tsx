import { Country } from '@country/model';
import { FormProps } from '@shared/presentation/types/form-type';

export type CountryFormFields = Pick<
  Country,
  'isoCode' | 'isAvailableToSearch' | 'name'
>;

export type CountrySubmit = CountryFormFields;

export type CountryDefaultValues = CountryFormFields;

export type CountryFormProps = FormProps<CountrySubmit, CountryDefaultValues>;
