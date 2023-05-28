import { PetAd } from '@pet-ad/model';
import prisma from '@shared/application/prisma';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';

export interface PetAdsListFinderByUser {
  (params: { userId: string; pagination?: PaginationParams }): Promise<
    PaginationResult<PetAd>
  >;
}

export const petAdsListFinderByUser: PetAdsListFinderByUser = async ({
  userId,
  pagination,
}) => {
  try {
    const [results, total] = await Promise.all([
      prisma.petAd.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        ...(pagination && {
          skip: pagination.limit * pagination.page,
          take: pagination.limit,
        }),
      }),
      prisma.petAd.count({
        where: { userId },
      }),
    ]);

    return { results, total };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of pet ads of  "${userId}" user could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
