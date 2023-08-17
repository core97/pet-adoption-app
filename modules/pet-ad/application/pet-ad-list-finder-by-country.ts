import dayjs from 'dayjs';
import { PetAd, ActivityLevelLabel, ACTIVITY_LEVEL_RANGE } from '@pet-ad/model';
import { Breed } from '@breed/model';
import prisma from '@shared/application/prisma';
import { Address } from '@shared/domain/address';
import { PaginationResult, PaginationParams } from '@shared/domain/pagination';
import { UnprocessableEntityError } from '@shared/application/errors/unprocessable-entity.error';
import { Coordinates } from '@shared/domain/coordinates';

export enum PetAdSortByOptions {
  RELEVANCE = 'RELEVANCE',
  DISTANCE = 'DISTANCE',
}

export interface PetAdsListFinderByCountry {
  (
    params: Partial<Pick<PetAd, 'breedIds' | 'petType' | 'gender' | 'size'>> & {
      country: string;
      activityLevelLabel?: ActivityLevelLabel;
      coordinates?: Coordinates;
      pagination?: PaginationParams;
      sortBy?: PetAdSortByOptions;
    }
  ): Promise<
    PaginationResult<
      Omit<PetAd, 'address'> & {
        breeds: Pick<Breed, 'name'>[];
        address: Pick<Address, 'city' | 'country'>;
      }
    >
  >;
}

export const isValidPetAdSorTypeOptions = (
  sortByType: any
): sortByType is PetAdSortByOptions =>
  typeof sortByType === 'string' &&
  Object.values(PetAdSortByOptions).some(item => item === sortByType);

export const petAdsListFinderByCountry: PetAdsListFinderByCountry = async ({
  country,
  breedIds,
  gender,
  petType,
  coordinates,
  size,
  activityLevelLabel,
  pagination = { limit: 20, page: 0 },
  sortBy = PetAdSortByOptions.RELEVANCE,
}) => {
  try {
    if (sortBy === PetAdSortByOptions.DISTANCE && !coordinates) {
      throw new UnprocessableEntityError(
        'Coordinates is required to sort by distance'
      );
    }

    const query = {
      'address.country': country.toUpperCase(),
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
        ...(sortBy === PetAdSortByOptions.DISTANCE && coordinates
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
        {
          $project: {
            results: '$data',
            metadata: { $arrayElemAt: ['$metadata', 0] },
          },
        },
      ],
    });

    const [data] = aggregationResult as unknown as Array<{
      results: Record<string, any>[];
      metadata: { total: number };
    }>;

    const results = await prisma.petAd.findMany({
      where: { id: { in: data.results.map(({ _id }) => _id.$oid.toString()) } },
      include: { breeds: { select: { name: true } } },
    });

    if (sortBy === PetAdSortByOptions.RELEVANCE) {
      results.sort((a, b) => {
        const [aCreatedDate, bCreatedDate] = [a, b].map(item =>
          dayjs(item.createdAt).startOf('day').toDate()
        );

        // Ordenar por "createdAt" de forma descendente
        if (aCreatedDate > bCreatedDate) return -1;
        if (aCreatedDate < bCreatedDate) return 1;

        const [aDateBirth, bDateBirth] = [a, b].map(item =>
          dayjs(item.dateBirth).startOf('day').toDate()
        );

        // Si "createdAt" es igual, ordenar por "dateBirth" de forma ascendente
        if (aDateBirth > bDateBirth) return 1;
        if (aDateBirth < bDateBirth) return -1;

        return 0;
      });
    } else if (sortBy === PetAdSortByOptions.DISTANCE) {
      results.sort((a, b) => {
        const [aDistance, bDistance] = [a, b].map(
          item =>
            data.results.find(({ _id }) => _id.$oid.toString() === item.id)
              ?.distance
        );

        // Ordenar por "distance" de forma ascendente
        if (aDistance > bDistance) return 1;
        if (aDistance < bDistance) return -1;

        return 0;
      });
    }

    return {
      results: results.map(({ address, ...rest }) => ({
        ...rest,
        address: { city: address.city, country: address.country },
      })),
      total: data.metadata?.total || 0,
    };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of pet ads by country could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
