import { AdoptionRequest } from '@pet-ad-request/types';
import { PaginationResult } from '@shared/domain/pagination';
import prisma from '@shared/application/prisma';

export interface PetAdsRequestsFinderByUser {
  (params: { userId: string }): Promise<PaginationResult<AdoptionRequest>>;
}

export const petAdsRequestsFinderByUser: PetAdsRequestsFinderByUser = async ({
  userId,
}) => {
  try {
    const results = await prisma.petAdRequest.findMany({
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
      error.message = `Failure to find pet ads requests by "${userId}" user. ${error.message}`;
    }

    throw error;
  }
};
