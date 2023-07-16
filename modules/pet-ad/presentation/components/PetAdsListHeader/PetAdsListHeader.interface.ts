import { Breed } from '@breed/model';
import { PetAdsFilterFormSubmit } from '@pet-ad/presentation/components/PetAdsFilterDrawer';

export type PetAdsListHeaderProps = {
  breeds: Pick<Breed, 'id' | 'name'>[];
  onChangeCountry: (countryIso: string) => void;
  onSubmitFilters: (filters: PetAdsFilterFormSubmit) => void;
};
