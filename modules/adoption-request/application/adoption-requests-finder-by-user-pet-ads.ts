import { sortByStatus } from '@adoption-request/model';
import { AdoptionRequestDto } from '@adoption-request/dto';
import { PaginationResult } from '@shared/domain/pagination';
import prisma from '@shared/application/prisma';

export interface AdoptionRequestsFinderByUserPetAds {
  (params: { userId: string }): Promise<PaginationResult<AdoptionRequestDto>>;
}

export const adoptionRequestsFinderByUserPetAds: AdoptionRequestsFinderByUserPetAds =
  async ({ userId }) => {
    try {
      const userPetAds = await prisma.petAd.findMany({
        where: { userId },
        select: { id: true },
      });

      const results = await prisma.adoptionRequest.findMany({
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
