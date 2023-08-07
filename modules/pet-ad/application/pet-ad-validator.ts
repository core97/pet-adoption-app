import { PetAd } from '@pet-ad/model';
import { isValidPetType } from '@shared/domain/pet-type';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

const IMAGES_PER_PET_AD = {
  MAX: 4,
  MIN: 1,
};

const BREEDS_PER_PET_AD = {
  MAX: 2,
  MIN: 1,
};

export const validatePetAd = async (petAd: Partial<PetAd>) => {
  if (
    petAd.images &&
    (petAd.images.length < IMAGES_PER_PET_AD.MIN ||
      petAd.images.length > IMAGES_PER_PET_AD.MAX)
  ) {
    throw new ConflictError(
      `Pet ad must have between ${IMAGES_PER_PET_AD.MIN} and ${IMAGES_PER_PET_AD.MAX} images`
    );
  }

  if (petAd.breedIds) {
    if (
      petAd.breedIds.length < BREEDS_PER_PET_AD.MIN ||
      petAd.breedIds.length > BREEDS_PER_PET_AD.MAX
    ) {
      throw new ConflictError(
        `Pet ad must have between ${BREEDS_PER_PET_AD.MIN} and ${BREEDS_PER_PET_AD.MAX} breeds`
      );
    }

    const breeds = await prisma.breed.findMany({
      where: { id: { in: petAd.breedIds } },
    });

    if (
      breeds.length > BREEDS_PER_PET_AD.MIN ||
      breeds.length > BREEDS_PER_PET_AD.MAX
    ) {
      throw new ConflictError(`Not found pet ad breeds`);
    }

    const areValidBreeds = breeds.every(({ petType }) =>
      petAd.petType
        ? petType === petAd.petType
        : isValidPetType(petType) && petType === breeds[0].petType
    );

    if (!areValidBreeds) {
      throw new ConflictError('Pet ad breeds are invalid');
    }
  }

  if (
    petAd.dateBirth &&
    new Date(petAd.dateBirth).getTime() > new Date().getTime()
  ) {
    throw new ConflictError('Pet ad date birth is invalid');
  }

  if (petAd.address) {
    const country = await prisma.country.findUnique({
      where: { isoCode: petAd.address.country.toLowerCase() },
    });

    if (!country) {
      throw new ConflictError('Country not available to add the pet ad');
    }
  }

  if (
    [petAd.activityLevel, petAd.sociability].some(
      range =>
        (typeof range === 'number' && range < 0) ||
        (typeof range === 'number' && range > 10) ||
        (typeof range === 'number' && !Number.isInteger(range)) ||
        typeof range !== 'number'
    )
  ) {
    throw new ConflictError(
      'Range of activity level or sociability shold be between 0 and 10'
    );
  }
};
