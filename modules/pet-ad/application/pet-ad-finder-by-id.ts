import { PetAd } from '@pet-ad/model';
import { PetAdDetailDto } from '@pet-ad/dto';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export interface PetAdFinderById {
  (
    params: Pick<PetAd, 'id'> & { options?: { requestingUser?: string } }
  ): Promise<PetAdDetailDto>;
}

export const petAdFinderById: PetAdFinderById = async ({ id, options = {} }) => {
  try {
    const petAd = await prisma.petAd.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!petAd) {
      throw new NotFoundError('Not found pet ad');
    }

    if (options.requestingUser && options.requestingUser !== petAd.userId) {
      const updateData: Parameters<typeof prisma.petAd.update>[0]['data'] = {
        viewsByUserId: { push: options.requestingUser },
      };

      const hasAlreadyBeenVisited = petAd.viewsByUserId.includes(
        options.requestingUser
      );

      if (!hasAlreadyBeenVisited) {
        updateData.views = { increment: +1 };
      }

      await prisma.petAd.update({
        where: { id },
        data: updateData,
      });
    }

    return petAd;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to get pet ad by "${id}" id. ${error.message}`;
    }

    throw error;
  }
};
