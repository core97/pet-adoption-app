import {
  PetAd as PetAdPrisma,
  Gender as PrismaGender,
  PetSize as PetSizePrisma,
} from '@prisma/client';

export type PetAd = PetAdPrisma;

export type Gender = PrismaGender;

export const GENDER: Record<Gender, Gender> = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
};

export type PetSize = PetSizePrisma;

export const PET_SIZE: Record<PetSize, PetSize> = {
  BIG: 'BIG',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
};
