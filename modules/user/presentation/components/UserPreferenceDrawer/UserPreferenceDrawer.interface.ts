import { Country } from '@country/model';

export type UserPreferencesFormFields = {
  countryToSearch: string;
};

export interface UserPreferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countries: Country[];
}
