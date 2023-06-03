import { PetAdRequest } from '@pet-ad-request/model';
import { PetAdRequestErrorsCode } from '@pet-ad-request/application/errors-code';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export const validatePetAdRequest = async (
  petAdRequest: Partial<PetAdRequest>
) => {
  const validateWithPetAd = async () => {
    if (petAdRequest.petAdId) {
      const petAd = await prisma.petAd.findUnique({
        where: { id: petAdRequest.petAdId },
      });

      if (!petAd) {
        throw new ConflictError(
          `Not found "${petAdRequest.petAdId}" pet ad of pet ad request`
        );
      }

      if (petAd.userId === petAdRequest.userId) {
        throw new ConflictError(
          `Pet ad request is being created with the same user "${petAdRequest.userId}" as the "${petAd.id}" pet ad `,
          PetAdRequestErrorsCode.REQUEST_WITH_SAME_CREATION_USER
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
          `Not found "${petAdRequest.userId}" user ad of pet ad request`
        );
      }

      if (!user.preadoption) {
        throw new ConflictError(
          `User "${petAdRequest.userId}" has not completed the pre-adoption form.`,
          PetAdRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER
        );
      }
    }
  };

  await Promise.all([validateWithPetAd(), validateWithUser()]);
};
