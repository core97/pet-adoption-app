import { PetAdFormProps } from '@pet-ad/presentation/components/PetAdForm/PetAdForm.interface';
import { Address } from '@shared/domain/address';

export type PetAdCreationFormProps = Pick<
  PetAdFormProps,
  'options' | 'petType'
> & { options: { addresses: Address[] } };
