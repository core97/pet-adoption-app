import { PetType as PetTypePrisma } from '@prisma/client';

export type PetType = PetTypePrisma;

export const PET_TYPES: Record<PetType, PetType> = {
  CAT: 'CAT',
  DOG: 'DOG',
};

export const isValidPetType = (petType: any): petType is PetType =>
  typeof petType === 'string' &&
  Object.values(PET_TYPES).some(item => item === petType);
