import { Country } from '@country/model';

export type SelectCountryFormFields = {
  countryToSearch: string;
};

export interface SelectCountryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countries: Country[];
  onSelectCountry?: (countryIso: string) => void;
}
