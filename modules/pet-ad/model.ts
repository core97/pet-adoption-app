import { PetAd as PetAdPrisma, Gender as PrismaGender } from '@prisma/client';

export type PetAd = PetAdPrisma;

export type Gender = PrismaGender;

export const GENDER: Record<Gender, Gender> = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
};
