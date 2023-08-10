import { Breed } from '@breed/model';
import { PetSize } from '@pet-ad/model';
import { Gender } from '@shared/domain/gender';
import { FormProps } from '@shared/presentation/types/form-type';

export type PetAdsFilterFormFields = {
  activityLevel: string;
  breed: string;
  gender: Gender;
  size: PetSize;
};

export type PetAdsFilterFormSubmit = Partial<PetAdsFilterFormFields>;

export type PetAdsFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  breeds: Pick<Breed, 'id' | 'name'>[];
} & Omit<
  FormProps<PetAdsFilterFormSubmit, PetAdsFilterFormFields>,
  'defaultValue'
>;
