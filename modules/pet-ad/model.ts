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
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
};

export const isValidSize = (size: any): size is PetSize =>
  typeof size === 'string' &&
  Object.values(PET_SIZE).some(item => item === size);

export enum ActivityLevelLabel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const isValidActivityLevelLabel = (
  activityLevel: any
): activityLevel is ActivityLevelLabel =>
  typeof activityLevel === 'string' &&
  Object.values(ActivityLevelLabel).some(item => item === activityLevel);

export const ACTIVITY_LEVEL_RANGE = {
  [ActivityLevelLabel.LOW]: { min: 1, max: 3 },
  [ActivityLevelLabel.MEDIUM]: { min: 4, max: 7 },
  [ActivityLevelLabel.HIGH]: { min: 8, max: 10 },
};
