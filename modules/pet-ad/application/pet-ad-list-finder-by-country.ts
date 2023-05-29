import { PetAd } from '@pet-ad/model';
import prisma from '@shared/application/prisma';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';
import { CountryIso } from '@shared/domain/country-iso';
import { SortBy } from '@shared/domain/sort-by';

export interface PetAdsListFinderByCountry {
  (
    params: Partial<Pick<PetAd, 'breedIds' | 'petType'>> & {
      country: CountryIso;
      pagination?: PaginationParams;
      sortBy?: Pick<SortBy<PetAd>, 'createdAt' | 'dateBirth'>;
    }
  ): Promise<PaginationResult<PetAd>>;
}

export const petAdsListFinderByCountry: PetAdsListFinderByCountry = async ({
  country,
  breedIds,
  pagination,
  petType,
  sortBy,
}) => {
  try {
    const whereFilter = {
      address: { is: { country } },
      ...(breedIds?.length && { breedIds: { hasSome: breedIds } }),
      ...(petType && { petType }),
    };

    const [results, total] = await Promise.all([
      prisma.petAd.findMany({
        where: whereFilter,

        orderBy: {
          ...(sortBy?.createdAt && { createdAt: sortBy.createdAt }),
          ...(sortBy?.dateBirth && { dateBirth: sortBy.dateBirth }),
        },

        ...(pagination && {
          skip: pagination.limit * pagination.page,
          take: pagination.limit,
        }),
      }),
      prisma.petAd.count({ where: whereFilter }),
    ]);

    return { results, total };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of pet ads by country could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
