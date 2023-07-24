import { Breed } from '@breed/model';
import { validateMultiLanguages } from '@shared/domain/languages';
import { ConflictError } from '@shared/application/errors/conflict.error';

const IMAGES_PER_BREED = {
  MAX: 4,
  MIN: 1,
};

export const validateBreed = (breed: Partial<Breed>) => {
  if (
    breed.images &&
    (breed.images.length < IMAGES_PER_BREED.MIN ||
      breed.images.length > IMAGES_PER_BREED.MAX)
  ) {
    throw new ConflictError(
      `Breed must have between ${IMAGES_PER_BREED.MIN} and ${IMAGES_PER_BREED.MAX} images`
    );
  }

  if (breed.name) {
    validateMultiLanguages(breed.name);
  }
};
