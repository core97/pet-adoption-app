import { PetAd, ActivityLevelLabel, ACTIVITY_LEVEL_RANGE } from '@pet-ad/model';
import prisma from '@shared/application/prisma';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';
import { Coordinates } from '@shared/domain/coordinates';
import { SortBy, SortOption } from '@shared/domain/sort-by';

export interface PetAdsListFinderByCountry {
  (
    params: Partial<Pick<PetAd, 'breedIds' | 'petType' | 'gender' | 'size'>> & {
      country: string;
      activityLevelLabel?: ActivityLevelLabel;
      coordinates?: Coordinates;
      pagination?: PaginationParams;
      sortBy?: Pick<SortBy<PetAd>, 'createdAt' | 'dateBirth'> & {
        distance?: SortOption;
      };
    }
  ): Promise<PaginationResult<PetAd>>;
}

export const petAdsListFinderByCountry: PetAdsListFinderByCountry = async ({
  country,
  breedIds,
  gender,
  petType,
  coordinates,
  size,
  activityLevelLabel,
  pagination = { limit: 20, page: 0 },
  sortBy = { createdAt: 'desc', dateBirth: 'desc' },
}) => {
  try {
    /* const whereFilter: Prisma.PetAdWhereInput = {
      address: { is: { country } },
      ...(breedIds?.length && { breedIds: { hasSome: breedIds } }),
      ...(petType && { petType }),
      ...(gender && { gender }),
      ...(size && petType === 'DOG' && { size }),
      ...(activityLevel && {
        activityLevel: { gte: activityLevel.min, lte: activityLevel.max },
      }),
    }; */

    /* const [results, total] = await Promise.all([
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
    ]); */

    const query = {
      'address.country': country,
      ...(breedIds?.length && { breedIds: { $in: breedIds } }),
      ...(petType && { petType }),
      ...(gender && { gender }),
      ...(size && petType === 'DOG' && { size }),
      ...(activityLevelLabel &&
        ACTIVITY_LEVEL_RANGE[activityLevelLabel] && {
          activityLevel: {
            $gte: ACTIVITY_LEVEL_RANGE[activityLevelLabel].min,
            $lte: ACTIVITY_LEVEL_RANGE[activityLevelLabel].max,
          },
        }),
    };

    const a = await prisma.petAd.aggregateRaw({
      pipeline: [
        ...(sortBy?.distance && coordinates
          ? [
              {
                $geoNear: {
                  near: {
                    type: 'Point',
                    coordinates: [coordinates.lng, coordinates.lat],
                  },
                  distanceField: 'distance',
                  spherical: true,
                  query,
                },
              },
              {
                $sort: {
                  distance: 1,
                },
              },
            ]
          : [
              {
                $match: query,
              },
              {
                $sort: {
                  createdAt: sortBy.createdAt === 'asc' ? 1 : -1,
                  dateBirth: sortBy.dateBirth === 'asc' ? 1 : -1,
                },
              },
            ]),
        {
          $facet: {
            data: [
              { $skip: pagination.limit * pagination.page },
              { $limit: pagination.limit },
            ],
            metadata: [{ $count: 'total' }],
          },
        },
      ],
    });

    console.log(a);

    return { results: [], total: 0 };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of pet ads by country could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
