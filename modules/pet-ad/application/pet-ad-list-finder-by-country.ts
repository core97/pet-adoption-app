import { Prisma } from '@prisma/client';
import { PetAd, ActivityLevelLabel, ACTIVITY_LEVEL_RANGE } from '@pet-ad/model';
import prisma from '@shared/application/prisma';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';
import { SortBy } from '@shared/domain/sort-by';

export interface PetAdsListFinderByCountry {
  (
    params: Partial<Pick<PetAd, 'breedIds' | 'petType' | 'gender' | 'size'>> & {
      country: string;
      activityLevelLabel?: ActivityLevelLabel;
      pagination?: PaginationParams;
      sortBy?: Pick<SortBy<PetAd>, 'createdAt' | 'dateBirth'>;
    }
  ): Promise<PaginationResult<PetAd>>;
}

export const petAdsListFinderByCountry: PetAdsListFinderByCountry = async ({
  country,
  breedIds,
  gender,
  pagination,
  petType,
  size,
  activityLevelLabel,
  sortBy,
}) => {
  try {
    const activityLevel = activityLevelLabel
      ? ACTIVITY_LEVEL_RANGE[activityLevelLabel]
      : null;

    const whereFilter: Prisma.PetAdWhereInput = {
      address: { is: { country } },
      ...(breedIds?.length && { breedIds: { hasSome: breedIds } }),
      ...(petType && { petType }),
      ...(gender && { gender }),
      ...(size && petType === 'DOG' && { size }),
      ...(activityLevel && {
        activityLevel: { gte: activityLevel.min, lte: activityLevel.max },
      }),
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
