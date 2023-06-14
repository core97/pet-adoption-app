import { PetAdRequest } from '@pet-ad-request/model';
import { validatePetAdRequest } from '@pet-ad-request/application/pet-ad-request-validator';
import { PetAdRequestErrorsCode } from '@pet-ad-request/application/errors-code';
import { EntityCreation } from '@shared/domain/entity';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface PetAdRequestCreator {
  (
    params: Omit<EntityCreation<PetAdRequest>, 'adoptionSteps'>
  ): Promise<PetAdRequest>;
}

export const petAdRequestCreator: PetAdRequestCreator = async petAdRequest => {
  try {
    const petAdRequestToCreate: EntityCreation<PetAdRequest> = {
      ...petAdRequest,
      adoptionSteps: [
        { status: 'PENDING', step: 'PREADOPTION_FORM', updatedAt: new Date() },
      ],
    };

    await validatePetAdRequest(petAdRequestToCreate);

    if (
      petAdRequestToCreate.status &&
      petAdRequestToCreate.status !== 'PENDING'
    ) {
      throw new ConflictError('Invalid status');
    }

    const alreadyPetAdRequestCreated = await prisma.petAdRequest.findFirst({
      where: {
        petAdId: petAdRequestToCreate.petAdId,
        userId: petAdRequestToCreate.userId,
      },
    });

    if (alreadyPetAdRequestCreated) {
      throw new ConflictError(
        `User "${petAdRequestToCreate.userId}" has already created a request for the "${petAdRequestToCreate.petAdId}" pet ad`,
        PetAdRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD
      );
    }

    const petAdRequestCreated = await prisma.petAdRequest.create({
      data: petAdRequestToCreate,
    });

    return petAdRequestCreated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to create the pet ad request. ${error.message}`;
    }

    throw error;
  }
};
