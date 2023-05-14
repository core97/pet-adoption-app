import { PetType as PetTypePrisma } from '@prisma/client';

export type PetType = PetTypePrisma;

export const PET_TYPES: Record<PetType, PetType> = {
  CAT: 'CAT',
  DOG: 'DOG',
};
