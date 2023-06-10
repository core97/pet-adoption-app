import {
  User as UserPrisma,
  PreadoptionForm as PreadoptionFormPrisma,
} from '@prisma/client';

export type User = UserPrisma;

export type UserRole = User['role'];

export type PreadoptionForm = PreadoptionFormPrisma;

export const isValidRole = (role: unknown): role is UserRole =>
  typeof role === 'string' &&
  (['ADMIN', 'USER'] as UserRole[]).some(item => item === role);

export const isValidEmail = (email: unknown): email is string => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return typeof email === 'string' && emailRegex.test(email);
};

export const isValidPassword = (password: unknown): password is string => {
  /**
   * - minimum length of 8 characters
   * - at least one special character
   * - at least one capital letter
   * - at least one number
   */
  const passwordRegex =
    /^(?=.*[!@#$%^&*()_+\\=[\]{};':"\\|,.<>?])(?=.*[A-Z])(?=.*[0-9]).{8,}$/gm;

  return typeof password === 'string' && passwordRegex.test(password);
};

export const getPublicData = (user: User) => {
  const { createdAt, email, id, image, name, updatedAt } = user;

  return { createdAt, email, id, image, name, updatedAt };
};
