import { sortByStatus } from '@adoption-request/model';
import { AdoptionRequestDto } from '@adoption-request/dto';
import { PaginationResult } from '@shared/domain/pagination';
import { ConflictError } from '@shared/application/errors/conflict.error';
import prisma from '@shared/application/prisma';

export interface AdoptionRequestsFinderByUserPetAds {
  (params: { petAdId: string; userId: string }): Promise<
    PaginationResult<AdoptionRequestDto>
  >;
}

export const adoptionRequestsFinderByUserPetAds: AdoptionRequestsFinderByUserPetAds =
  async ({ petAdId, userId }) => {
    try {
      const results = await prisma.adoptionRequest.findMany({
        where: { petAdId },
        orderBy: { updatedAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          petAd: { select: { images: true, name: true, userId: true } },
        },
      });

      if (results.some(({ petAd }) => petAd.userId !== userId)) {
        throw new ConflictError(
          'Adoption request ad does not belong to the user'
        );
      }

      return {
        results: sortByStatus(results, ['ACCEPTED', 'PENDING', 'REJECTED']),
        total: results.length,
      };
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Failure to find adoption requests by "${userId}" user pet ads. ${error.message}`;
      }

      throw error;
    }
  };
