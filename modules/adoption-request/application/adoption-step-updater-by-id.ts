import { PetAdRequest, AdoptionStep } from '@adoption-request/model';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface AdoptionStepUpdaterById {
  (params: {
    searchParam: Pick<PetAdRequest, 'id'>;
    data: { adoptionStep: AdoptionStep; userId: string };
  }): Promise<PetAdRequest>;
}

export const adoptionStepUpdaterById: AdoptionStepUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    if (data.adoptionStep.status === 'PENDING') {
      throw new ConflictError(
        'It is not possible to update an adoption step with "PENDING" because it is the default status.'
      );
    }

    const petAdRequest = await prisma.adoptionRequest.findUnique({
      where: { id: searchParam.id },
    });

    if (!petAdRequest) {
      throw new NotFoundError(
        `Not found adoption requests by "${searchParam.id}" when updating adoption step.`
      );
    }

    const petAd = await prisma.petAd.findUnique({
      where: { id: petAdRequest.petAdId },
    });

    if (!petAd) {
      throw new NotFoundError(
        `Not found pet ad from adoption requests by "${searchParam.id}" when updating adoption step.`
      );
    }

    if (petAd.userId !== data.userId) {
      throw new ForbiddenError(
        `User ${data.userId} is unable to update the adoption steps of request.`
      );
    }

    const adoptionSteps = petAdRequest.steps.map(step => {
      const isUpdate = step.step === data.adoptionStep.step;

      const newStep: AdoptionStep = {
        status: isUpdate ? data.adoptionStep.status : step.status,
        step: isUpdate ? data.adoptionStep.step : step.step,
        updatedAt: isUpdate ? new Date() : step.updatedAt,
      };

      return newStep;
    });

    const petAdRequestUpdated = await prisma.adoptionRequest.update({
      where: { id: searchParam.id },
      data: { steps: adoptionSteps },
    });

    return petAdRequestUpdated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Steps of "${searchParam.id}" adoption request could not be updated by id. ${error.message}`;
    }

    throw error;
  }
};
