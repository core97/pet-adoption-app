import { PetAdRequest } from '@pet-ad-request/model';
import { validatePetAdRequest } from '@pet-ad-request/application/pet-ad-request-validator';
import { PetAdRequestErrorsCode } from '@pet-ad-request/application/errors-code';
import { EntityCreation } from '@shared/domain/entity';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface PetAdRequestCreator {
  (params: EntityCreation<PetAdRequest>): Promise<PetAdRequest>;
}

export const petAdRequestCreator: PetAdRequestCreator = async petAdRequest => {
  try {
    await validatePetAdRequest(petAdRequest);

    if (petAdRequest.status && petAdRequest.status !== 'PENDING') {
      throw new ConflictError('Invalid status');
    }

    const alreadyPetAdRequestCreated = await prisma.petAdRequest.findFirst({
      where: { petAdId: petAdRequest.petAdId, userId: petAdRequest.userId },
    });

    if (alreadyPetAdRequestCreated) {
      throw new ConflictError(
        `User "${petAdRequest.userId}" has already created a request for the "${petAdRequest.petAdId}" pet ad`,
        PetAdRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD
      );
    }

    const petAdRequestCreated = await prisma.petAdRequest.create({
      data: petAdRequest,
    });

    return petAdRequestCreated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to create the pet ad request. ${error.message}`;
    }

    throw error;
  }
};
