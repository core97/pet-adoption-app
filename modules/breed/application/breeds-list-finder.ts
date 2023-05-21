import { Breed } from '@breed/model';
import { PaginationParams, PaginationResult } from '@shared/domain/pagination';
import { SortBy } from '@shared/domain/sort-by';
import { prisma } from '@shared/application/prisma';

export interface BreedsListFinder {
  (
    breedSearchParams: Partial<
      Pick<Breed, 'petType'> & {
        pagination: PaginationParams;
        sortBy: Pick<SortBy<Breed>, 'createdAt' | 'name'>;
      }
    >
  ): Promise<PaginationResult<Breed>>;
}

export const breedsListFinder: BreedsListFinder = async ({
  petType,
  sortBy,
  pagination,
}) => {
  try {
    const whereFilter = {
      ...(petType && { petType }),
    };

    const [results, total] = await Promise.all([
      prisma.breed.findMany({
        where: whereFilter,
        ...(sortBy && { orderBy: sortBy }),
        ...(pagination && {
          skip: pagination.limit * pagination.page,
          take: pagination.limit,
        }),
      }),
      prisma.breed.count({
        where: whereFilter,
      }),
    ]);

    return { results, total };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `The list of breeds could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
