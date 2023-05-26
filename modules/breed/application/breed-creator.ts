import { Breed } from '@breed/model';
import { validateBreed } from '@breed/application/breed-validator';
import { EntityCreation } from '@shared/domain/entity';
import { prisma } from '@shared/application/prisma';

export const breedCreator = async (breed: EntityCreation<Breed>) => {
  try {
    validateBreed(breed);

    const breedCreated = await prisma.breed.create({
      data: breed,
    });
  
    return breedCreated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to create the breed. ${error.message}`;
    }

    throw error;
  }

};
