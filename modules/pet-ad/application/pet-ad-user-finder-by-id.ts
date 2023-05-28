import { PetAd } from '@pet-ad/model';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';

export interface PetAdUserFinderById {
  (petAdSearchParams: Pick<PetAd, 'id'> & { userId: string }): Promise<PetAd>;
}

export const petAdUserFinderById: PetAdUserFinderById = async ({
  id,
  userId,
}) => {
  try {
    const petAd = await prisma.petAd.findUnique({ where: { id } });

    if (!petAd) {
      throw new NotFoundError(`Not found pet ad by "${id}" id`);
    }

    if (petAd.userId !== userId) {
      throw new ForbiddenError(
        `"${userId}" user is not the creator of the "${id}" pet ad`
      );
    }

    return petAd;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Pet ad by could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
