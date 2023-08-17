import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';
import { Address } from '@shared/domain/address';
import prisma from '@shared/application/prisma';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';

export interface PetAdsListFinderByUser {
  (params: { userId: string; pagination?: PaginationParams }): Promise<
    PaginationResult<
      Omit<PetAd, 'address'> & {
        breeds: Pick<Breed, 'name'>[];
        address: Pick<Address, 'city' | 'country'>;
      }
    >
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
        include: {
          breeds: { select: { name: true } },
        },
        ...(pagination && {
          skip: pagination.limit * pagination.page,
          take: pagination.limit,
        }),
      }),
      prisma.petAd.count({
        where: { userId },
      }),
    ]);

    return {
      results: results.map(({ address, ...rest }) => ({
        ...rest,
        address: { city: address.city, country: address.country },
      })),
      total,
    };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of pet ads of  "${userId}" user could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
