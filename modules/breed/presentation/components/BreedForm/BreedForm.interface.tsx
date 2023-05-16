import { Breed } from '@breed/model';
import { PetType } from '@shared/domain/pet-type';
import { EntityCreation } from '@shared/domain/entity';
import { FormProps } from '@shared/presentation/types/form-type';

export type BreedFormFields = {
  name: string;
  images: File[];
  petType: PetType;
};

export type BreedSubmit = EntityCreation<Breed>;

export type BreedDefaultValues = Omit<BreedFormFields, 'images'> &
  Pick<Breed, 'images'>;

export type BreedFormProps = FormProps<BreedSubmit, BreedDefaultValues>;
