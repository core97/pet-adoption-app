import { PetAd } from '@pet-ad/model';
import { validatePetAd } from '@pet-ad/application/pet-ad-validator';
import prisma from '@shared/application/prisma';
import { deleteFile } from '@shared/infra/storage';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';

export interface PetAdUpdaterById {
  (params: {
    searchParam: Pick<PetAd, 'id'> & { userId: string };
    data: Partial<PetAd>;
  }): Promise<PetAd>;
}

export const petAdUpdaterById: PetAdUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    validatePetAd(data);
    const oldPetAd = await prisma.petAd.findUnique({
      where: { id: searchParam.id },
      select: { images: true, userId: true },
    });

    if (!oldPetAd) {
      throw new NotFoundError(`Not found "${searchParam.id}" pet ad`);
    }

    if (oldPetAd.userId !== searchParam.userId) {
      throw new ForbiddenError(
        `"${searchParam.userId}" user is not the creator of the "${searchParam.id}" pet ad`
      );
    }

    if (data.images?.length) {
      await Promise.all(
        (oldPetAd?.images || []).map(item => deleteFile(item.publicId))
      );
    }

    const { petType, userId, ...dataToUpdate } = data;

    const petAd = await prisma.petAd.update({
      where: searchParam,
      data: dataToUpdate,
    });

    return petAd;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Breed could not be updated by id. ${error.message}`;
    }

    throw error;
  }
};
