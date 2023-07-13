import { Country } from '@country/model';

export type SearchPreferencesFormFields = {
  countryToSearch: string;
};

export type SearchPreferencesDefaultValues = SearchPreferencesFormFields;

export interface SearchPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  countries: Country[];
  defaultValue?: SearchPreferencesFormFields;
}
