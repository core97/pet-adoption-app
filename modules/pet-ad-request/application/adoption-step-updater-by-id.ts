import { PetAdRequest, AdoptionStep } from '@pet-ad-request/model';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface AdoptionStepUpdaterUpdaterById {
  (params: {
    searchParam: Pick<PetAdRequest, 'id'>;
    data: { adoptionStep: AdoptionStep; userId: string };
  }): Promise<PetAdRequest>;
}

export const adoptionStepUpdaterById: AdoptionStepUpdaterUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    if (data.adoptionStep.status === 'PENDING') {
      throw new ConflictError(
        'It is not possible to update an adoption step with "PENDING" because it is the default status.'
      );
    }

    const petAdRequest = await prisma.petAdRequest.findUnique({
      where: { id: searchParam.id },
    });

    if (!petAdRequest) {
      throw new NotFoundError(
        `Not found pet ad requests by "${searchParam.id}" when updating adoption step.`
      );
    }

    const petAd = await prisma.petAd.findUnique({
      where: { id: petAdRequest.petAdId },
    });

    if (!petAd) {
      throw new NotFoundError(
        `Not found pet ad from pet ad requests by "${searchParam.id}" when updating adoption step.`
      );
    }

    if (petAd.userId !== data.userId) {
      throw new ForbiddenError(
        `User ${data.userId} is unable to update the adoption steps of request.`
      );
    }

    const preadoptionFormStep = petAdRequest.adoptionSteps.find(
      ({ step }) => step === 'PREADOPTION_FORM'
    );

    if (
      data.adoptionStep.step === 'MEETING' &&
      preadoptionFormStep?.status !== 'ACCEPTED'
    ) {
      throw new ConflictError('Invalid status of previous adoption step.');
    }

    const adoptionSteps = petAdRequest.adoptionSteps.map(step => {
      const isUpdate = step.step === data.adoptionStep.step;

      const newStep: AdoptionStep = {
        status: isUpdate ? data.adoptionStep.status : step.status,
        step: isUpdate ? data.adoptionStep.step : step.step,
        updatedAt: isUpdate ? new Date() : step.updatedAt,
      };

      return newStep;
    });

    const petAdRequestUpdated = await prisma.petAdRequest.update({
      where: { id: searchParam.id },
      data: { adoptionSteps },
    });

    return petAdRequestUpdated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Adoption steps of "${searchParam.id}" pet ad request could not be updated by id. ${error.message}`;
    }

    throw error;
  }
};
