import { PetAdFormProps } from '@pet-ad/presentation/components/PetAdForm/PetAdForm.interface';

export type PetAdCreationFormProps = Pick<
  PetAdFormProps,
  'options' | 'petType'
>;
