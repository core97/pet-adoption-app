import { Breed } from '@breed/model';
import { Gender } from '@shared/domain/gender';
import { FormProps } from '@shared/presentation/types/form-type';

export type PetAdsFilterFormFields = {
  breed: string;
  gender: Gender;
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
