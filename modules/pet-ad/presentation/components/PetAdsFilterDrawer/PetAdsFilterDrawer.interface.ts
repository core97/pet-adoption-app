import { Breed } from '@breed/model';
import { PetSize } from '@pet-ad/model';
import { PetAdSortByOptions } from '@pet-ad/application/pet-ad-list-finder-by-country';
import { Gender } from '@shared/domain/gender';
import { Coordinates } from '@shared/domain/coordinates';
import { FormProps } from '@shared/presentation/types/form-type';

export type PetAdsFilterFormFields = {
  activityLevel: string;
  breed: string;
  gender: Gender;
  size: PetSize;
  sortBy: PetAdSortByOptions;
};

export type PetAdsFilterFormSubmit = Partial<
  PetAdsFilterFormFields & { coordinates: Coordinates }
>;

export type PetAdsFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  breeds: Pick<Breed, 'id' | 'name'>[];
} & Omit<
  FormProps<PetAdsFilterFormSubmit, PetAdsFilterFormFields>,
  'defaultValue'
>;
