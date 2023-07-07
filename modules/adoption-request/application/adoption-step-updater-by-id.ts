import { PetAdRequest, AdoptionStep } from '@adoption-request/model';
import { NOTIFICATION_TYPES } from '@notification/model';
import { notificationCreator } from '@notification/application/notification-creator';
import prisma from '@shared/application/prisma';
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

    const adoptionRequest = await prisma.adoptionRequest.findUniqueOrThrow({
      where: { id: searchParam.id },
    });

    const petAd = await prisma.petAd.findUniqueOrThrow({
      where: { id: adoptionRequest.petAdId },
    });

    if (petAd.userId !== data.userId) {
      throw new ForbiddenError(
        `User ${data.userId} is unable to update the adoption steps of request.`
      );
    }

    const adoptionSteps = adoptionRequest.steps.map(step => {
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

    if (data.adoptionStep.step === 'PREADOPTION_FORM') {
      await notificationCreator({
        type:
          data.adoptionStep.status === 'ACCEPTED'
            ? NOTIFICATION_TYPES.ACCEPTED_PREADOPTION_FORM
            : NOTIFICATION_TYPES.DECLINED_PREADOPTION_FORM,
        petAdId: petAdRequestUpdated.petAdId,
        userIdToNotify: adoptionRequest.userId,
      });
    }

    return petAdRequestUpdated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Steps of "${searchParam.id}" adoption request could not be updated by id. ${error.message}`;
    }

    throw error;
  }
};
