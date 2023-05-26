import { Breed } from '@breed/model';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export interface BreedFinderById {
  (breedSearchParams: Pick<Breed, 'id'>): Promise<Breed>;
}

export const breedFinderById: BreedFinderById = async ({ id }) => {
  try {
    const breed = await prisma.breed.findUnique({ where: { id } });

    if (!breed) {
      throw new NotFoundError(`Not found breed by "${id}" id`);
    }

    return breed;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Breed by could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
