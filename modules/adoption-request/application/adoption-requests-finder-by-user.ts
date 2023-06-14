import { AdoptionRequestDto } from '@adoption-request/dto';
import { PaginationResult } from '@shared/domain/pagination';
import prisma from '@shared/application/prisma';

export interface AdoptionRequestsFinderByUser {
  (params: { userId: string }): Promise<PaginationResult<AdoptionRequestDto>>;
}

export const adoptionRequestsFinderByUser: AdoptionRequestsFinderByUser =
  async ({ userId }) => {
    try {
      const results = await prisma.adoptionRequest.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        include: {
          user: { select: { name: true } },
          petAd: { select: { images: true, name: true } },
        },
      });

      return {
        total: results.length,
        results,
      };
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Failure to find adoption requests by "${userId}" user. ${error.message}`;
      }

      throw error;
    }
  };
