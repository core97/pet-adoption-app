import { PetAd } from '@pet-ad/model';
import { validatePetAd } from '@pet-ad/application/pet-ad-validator';
import { EntityCreation } from '@shared/domain/entity';
import prisma from '@shared/application/prisma';

export interface PetAdCreator {
  (petAd: EntityCreation<PetAd>): Promise<PetAd>;
}

export const petAdCreator: PetAdCreator = async petAd => {
  try {
    await validatePetAd(petAd);

    const petAdCreated = await prisma.petAd.create({
      data: {
        ...petAd,
        activityLevel: Number(petAd.activityLevel),
        sociability: Number(petAd.sociability),
      },
    });

    return petAdCreated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to create the pet ad. ${error.message}`;
    }

    throw error;
  }
};
