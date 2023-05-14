import { Breed } from '@breed/model';
import { validateBreed } from '@breed/application/breed-validator';
import { EntityCreation } from '@shared/domain/entity';
import { prisma } from '@shared/application/prisma';

export const createBreed = async (breed: EntityCreation<Breed>) => {
  validateBreed(breed);

  const breedCreated = await prisma.breed.create({
    data: breed,
  });

  return breedCreated;
};
