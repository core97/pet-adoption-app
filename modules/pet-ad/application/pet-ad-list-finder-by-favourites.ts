import { PetAd } from '@pet-ad/model';
import prisma from '@shared/application/prisma';
import { PaginationResult } from '@shared/domain/pagination';

export interface PetAdsListFinderByFavourites {
  (params: { userId: string }): Promise<PaginationResult<PetAd>>;
}

export const petAdsListFinderByFavourites: PetAdsListFinderByFavourites =
  async ({ userId }) => {
    try {
      const { favouritesPetAds } = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: { favouritesPetAds: { orderBy: { createdAt: 'desc' } } },
      });

      return { results: favouritesPetAds, total: favouritesPetAds.length };
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Pet ads favourites of  "${userId}" user could not be obtained. ${error.message}`;
      }

      throw error;
    }
  };
