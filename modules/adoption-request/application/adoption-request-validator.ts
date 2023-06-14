import { PetAdRequest, ADOPTION_STEPS_TYPES } from '@adoption-request/model';
import { AdoptionRequestErrorsCode } from '@adoption-request/application/adoption-request-errors-code';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export const validateAdoptionRequest = async (
  petAdRequest: Partial<PetAdRequest>
) => {
  const validateWithPetAd = async () => {
    if (petAdRequest.petAdId) {
      const petAd = await prisma.petAd.findUnique({
        where: { id: petAdRequest.petAdId },
      });

      if (!petAd) {
        throw new ConflictError(
          `Not found "${petAdRequest.petAdId}" pet ad of adoption request`
        );
      }

      if (petAd.userId === petAdRequest.userId) {
        throw new ConflictError(
          `Adoption request is being created with the same user "${petAdRequest.userId}" as the "${petAd.id}" pet ad `,
          AdoptionRequestErrorsCode.REQUEST_WITH_SAME_CREATION_USER
        );
      }
    }
  };

  const validateWithUser = async () => {
    if (petAdRequest.userId) {
      const user = await prisma.user.findUnique({
        where: { id: petAdRequest.userId },
      });

      if (!user) {
        throw new ConflictError(
          `Not found "${petAdRequest.userId}" user ad of adoption request`
        );
      }

      if (!user.preadoptionForm) {
        throw new ConflictError(
          `User "${petAdRequest.userId}" has not completed the preadoption form.`,
          AdoptionRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER
        );
      }
    }
  };

  const validateAdoptionSteps = () => {
    if (petAdRequest.steps) {
      if (
        petAdRequest.steps.length !== Object.values(ADOPTION_STEPS_TYPES).length
      ) {
        throw new ConflictError(
          'Adoption request has more adoption steps than expected.'
        );
      }

      const statusesNoDuplicates = [
        ...new Set(petAdRequest.steps.map(({ step }) => step)),
      ];

      if (petAdRequest.steps.length !== statusesNoDuplicates.length) {
        throw new ConflictError('There are duplicate adoption steps.');
      }
    }
  };

  await validateWithPetAd();

  validateAdoptionSteps();

  await validateWithUser();
};
