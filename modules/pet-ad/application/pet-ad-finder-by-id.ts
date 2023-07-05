import { PetAd } from '@pet-ad/model';
import { PetAdDetailDto } from '@pet-ad/dto';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export interface PetAdFinderById {
  (
    params: Pick<PetAd, 'id'> & { options?: { requestingUser?: string } }
  ): Promise<PetAdDetailDto>;
}

export const petAdFinderById: PetAdFinderById = async ({
  id,
  options = {},
}) => {
  try {
    const petAd = await prisma.petAd.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!petAd) {
      throw new NotFoundError('Not found pet ad');
    }

    if (options.requestingUser && options.requestingUser !== petAd.userId) {
      const petAdView = await prisma.petAdViews.findFirst({
        where: {
          userId: options.requestingUser,
          petAdId: id,
        },
      });

      if (!petAdView) {
        await prisma.petAdViews.create({
          data: {
            petAdId: id,
            userId: options.requestingUser,
          },
        });
      } else {
        await prisma.petAdViews.update({
          where: {
            id: petAdView.id,
          },
          data: {
            viewsCounter: { increment: 1 },
          },
        });
      }
    }

    return petAd;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to get pet ad by "${id}" id. ${error.message}`;
    }

    throw error;
  }
};
