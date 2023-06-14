import { PetAdRequest } from '@adoption-request/model';
import { validateAdoptionRequest } from '@adoption-request/application/adoption-request-validator';
import { AdoptionRequestErrorsCode } from '@adoption-request/application/adoption-request-errors-code';
import { EntityCreation } from '@shared/domain/entity';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface AdoptionRequestCreator {
  (
    params: Omit<EntityCreation<PetAdRequest>, 'steps'>
  ): Promise<PetAdRequest>;
}

export const adoptionRequestCreator: AdoptionRequestCreator =
  async petAdRequest => {
    try {
      const adoptionRequestToCreate: EntityCreation<PetAdRequest> = {
        ...petAdRequest,
        steps: [
          {
            status: 'PENDING',
            step: 'PREADOPTION_FORM',
            updatedAt: new Date(),
          },
        ],
      };

      await validateAdoptionRequest(adoptionRequestToCreate);

      if (
        adoptionRequestToCreate.status &&
        adoptionRequestToCreate.status !== 'PENDING'
      ) {
        throw new ConflictError('Invalid status');
      }

      const alreadyPetAdRequestCreated = await prisma.adoptionRequest.findFirst({
        where: {
          petAdId: adoptionRequestToCreate.petAdId,
          userId: adoptionRequestToCreate.userId,
        },
      });

      if (alreadyPetAdRequestCreated) {
        throw new ConflictError(
          `User "${adoptionRequestToCreate.userId}" has already created a request for the "${adoptionRequestToCreate.petAdId}" pet ad`,
          AdoptionRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD
        );
      }

      const petAdRequestCreated = await prisma.adoptionRequest.create({
        data: adoptionRequestToCreate,
      });

      return petAdRequestCreated;
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Failure to create the adoption request. ${error.message}`;
      }

      throw error;
    }
  };
