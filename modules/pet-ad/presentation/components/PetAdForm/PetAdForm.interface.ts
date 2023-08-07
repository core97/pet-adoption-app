import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';
import { EntityCreation } from '@shared/domain/entity';
import { FormProps } from '@shared/presentation/types/form-type';
import { PetType } from '@shared/domain/pet-type';

export type PetAdFormFields = Pick<
  PetAd,
  | 'breedIds'
  | 'dateBirth'
  | 'name'
  | 'gender'
  | 'activityLevel'
  | 'size'
  | 'sociability'
  | 'checkpoints'
  | 'description'
> & {
  images: (File | string)[];
};

export type PetAdSubmit = Omit<EntityCreation<PetAd>, 'address' | 'userId'>;

export type PetAdDefaultValues = Omit<PetAdFormFields, 'images'> &
  Pick<PetAd, 'images'>;

export type PetAdFormProps = FormProps<PetAdSubmit, PetAdDefaultValues> & {
  petType: PetType;
  options: {
    breeds: Breed[];
  };
};
