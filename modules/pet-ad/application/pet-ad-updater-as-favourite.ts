import { PetAd } from '@pet-ad/model';
import { PetAdDetailDto } from '@pet-ad/dto';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface PetAdUpdaterAsFavourite {
  (params: {
    searchParam: Pick<PetAd, 'id'>;
    data: { requestingUser: string };
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

    if (petAd.userId === data.requestingUser) {
      throw new ConflictError(
        'The creator of the pet ad cannot mark your pet ad as a favourite.'
      );
    }

    const isAlreadyFavourite = petAd.favouritesUsersId.includes(
      data.requestingUser
    );

    const petAdUpdated = await prisma.petAd.update({
      where: { id: searchParam.id },
      data: {
        favouritesUsersId: isAlreadyFavourite
          ? {
              set: petAd.favouritesUsersId.filter(
                userId => userId !== data.requestingUser
              ),
            }
          : { push: data.requestingUser },
      },
      include: { user: { select: { name: true, email: true } } },
    });

    return petAdUpdated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${searchParam.id} pet ad could not be marked as favourite. ${error.message}`;
    }

    throw error;
  }
};
