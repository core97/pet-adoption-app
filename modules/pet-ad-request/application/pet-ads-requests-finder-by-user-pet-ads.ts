import { sortByStatus } from '@pet-ad-request/model';
import { AdoptionRequestDto } from '@pet-ad-request/types';
import { PaginationResult } from '@shared/domain/pagination';
import prisma from '@shared/application/prisma';

export interface PetAdsRequestsFinderByUserPetAds {
  (params: { userId: string }): Promise<PaginationResult<AdoptionRequestDto>>;
}

export const petAdsRequestsFinderByUserPetAds: PetAdsRequestsFinderByUserPetAds =
  async ({ userId }) => {
    try {
      const userPetAds = await prisma.petAd.findMany({
        where: { userId },
        select: { id: true },
      });

      const results = await prisma.petAdRequest.findMany({
        where: { petAdId: { in: userPetAds.map(({ id }) => id) } },
        orderBy: { updatedAt: 'desc' },
        include: {
          user: { select: { name: true } },
          petAd: { select: { images: true, name: true } },
        },
      });

      return {
        results: sortByStatus(results, ['PENDING', 'ACCEPTED', 'REJECTED']),
        total: results.length,
      };
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Failure to find pet ads requests by "${userId}" user pet ads. ${error.message}`;
      }

      throw error;
    }
  };
