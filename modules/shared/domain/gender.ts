import { Gender as GenderPrisma } from '@prisma/client';

export type Gender = GenderPrisma;

export const GENDERS: Record<Gender, Gender> = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
};

export const isValidGender = (gender: any): gender is Gender =>
  typeof gender === 'string' &&
  Object.values(GENDERS).some(item => item === gender);
