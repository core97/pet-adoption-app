import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';
import { Address } from '@shared/domain/address';
import prisma from '@shared/application/prisma';
import { PaginationResult } from '@shared/domain/pagination';

export interface PetAdsListFinderByFavourites {
  (params: { userId: string }): Promise<
    PaginationResult<
      Omit<PetAd, 'address'> & {
        breeds: Pick<Breed, 'name'>[];
        address: Pick<Address, 'city' | 'country'>;
      }
    >
  >;
}

export const petAdsListFinderByFavourites: PetAdsListFinderByFavourites =
  async ({ userId }) => {
    try {
      const { favouritesPetAds } = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: {
          favouritesPetAds: {
            include: { breeds: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      return {
        results: favouritesPetAds.map(({ address, ...rest }) => ({
          ...rest,
          address: { city: address.city, country: address.country },
        })),
        total: favouritesPetAds.length,
      };
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Pet ads favourites of  "${userId}" user could not be obtained. ${error.message}`;
      }

      throw error;
    }
  };
