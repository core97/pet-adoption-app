import { PetAd } from '@pet-ad/model';
import { PetAdDetailDto } from '@pet-ad/dto';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface PetAdUpdaterAsFavourite {
  (params: {
    searchParam: Pick<PetAd, 'id'>;
    data: { requestingUserId: string };
  }): Promise<PetAdDetailDto>;
}

export const petAdUpdaterAsFavourite: PetAdUpdaterAsFavourite = async ({
  data,
  searchParam,
}) => {
  try {
    const petAd = await prisma.petAd.findUniqueOrThrow({
      where: { id: searchParam.id },
    });

    const requestinUser = await prisma.user.findUniqueOrThrow({
      where: { id: data.requestingUserId },
    });

    if (petAd.userId === data.requestingUserId) {
      throw new ConflictError(
        'The creator of the pet ad cannot mark your pet ad as a favourite.'
      );
    }

    const isAlreadyFavourite = petAd.favouritesUsersId.includes(
      data.requestingUserId
    );

    const petAdUpdate = prisma.petAd.update({
      where: { id: searchParam.id },
      data: {
        favouritesUsersId: isAlreadyFavourite
          ? {
              set: petAd.favouritesUsersId.filter(
                userId => userId !== data.requestingUserId
              ),
            }
          : { push: data.requestingUserId },
      },
      include: { user: { select: { name: true, email: true } } },
    });

    const userUpdate = prisma.user.update({
      where: { id: requestinUser.id },
      data: {
        favouritesPetAdsIds: isAlreadyFavourite
          ? {
              set: requestinUser.favouritesPetAdsIds.filter(
                petAdId => petAdId !== petAd.id
              ),
            }
          : { push: petAd.id },
      },
    });

    const [petAdUpdated] = await prisma.$transaction([petAdUpdate, userUpdate]);

    return petAdUpdated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${searchParam.id} pet ad could not be marked as favourite. ${error.message}`;
    }

    throw error;
  }
};
