import { PetAd, ActivityLevelLabel, ACTIVITY_LEVEL_RANGE } from '@pet-ad/model';
// TODO: mover este tipo de aquí
import { SortByOptions } from '@pet-ad/presentation/components/PetAdsFilterDrawer/PetAdsFilterDrawer.interface';
import prisma from '@shared/application/prisma';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';
import { UnprocessableEntityError } from '@shared/application/errors/unprocessable-entity.error';
import { Coordinates } from '@shared/domain/coordinates';

export interface PetAdsListFinderByCountry {
  (
    params: Partial<Pick<PetAd, 'breedIds' | 'petType' | 'gender' | 'size'>> & {
      country: string;
      activityLevelLabel?: ActivityLevelLabel;
      coordinates?: Coordinates;
      pagination?: PaginationParams;
      sortBy?: SortByOptions;
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
  sortBy = SortByOptions.RELEVANCE,
}) => {
  try {
    if (sortBy === SortByOptions.DISTANCE && !coordinates) {
      throw new UnprocessableEntityError(
        'Coordinates is required to sort by distance'
      );
    }

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

    const aggregationResult = await prisma.petAd.aggregateRaw({
      pipeline: [
        ...(sortBy === SortByOptions.DISTANCE && coordinates
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
                  createdAt: -1,
                  dateBirth: 1,
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

    const [aggregationResultAsAny] = aggregationResult as unknown as any[];
    const results = aggregationResultAsAny.data;
    const total = aggregationResultAsAny.metadata[0]?.total || 0;

    return { results, total };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of pet ads by country could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
