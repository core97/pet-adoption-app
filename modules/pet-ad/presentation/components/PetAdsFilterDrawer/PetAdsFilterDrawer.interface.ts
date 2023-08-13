import { Breed } from '@breed/model';
import { PetSize } from '@pet-ad/model';
import { Gender } from '@shared/domain/gender';
import { Coordinates } from '@shared/domain/coordinates';
import { FormProps } from '@shared/presentation/types/form-type';

export enum SortByOptions {
  RELEVANCE = 'RELEVANCE',
  DISTANCE = 'DISTANCE',
}

export type PetAdsFilterFormFields = {
  activityLevel: string;
  breed: string;
  gender: Gender;
  size: PetSize;
  sortBy: SortByOptions;
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
