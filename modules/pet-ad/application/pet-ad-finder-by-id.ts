import { PetAd } from '@pet-ad/model';
import { PetAdDetailDto } from '@pet-ad/dto';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export interface PetAdFinderById {
  (params: Pick<PetAd, 'id'>): Promise<PetAdDetailDto>;
}

export const petAdFinderById: PetAdFinderById = async ({ id }) => {
  try {
    const petAd = await prisma.petAd.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!petAd) {
      throw new NotFoundError('Not found pet ad');
    }

    return petAd;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to get pet ad by "${id}" id. ${error.message}`;
    }

    throw error;
  }
};
