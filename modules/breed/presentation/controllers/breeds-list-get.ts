import { breedsListFinder } from '@breed/application/breeds-list-finder';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { isValidPetType } from '@shared/domain/pet-type';
import { isVaidPaginationQueryParams } from '@shared/domain/pagination';
import { isValidSortOption } from '@shared/domain/sort-by';

export const breedsListGet = controller(async req => {
  const { searchParams } = new URL(req.url);
  const [petType, createdAt, limit, page] = [
    'petType',
    'createdAt',
    'limit',
    'page',
  ].map(param => searchParams.get(param));

  const pagination = { page, limit };

  const breed = await breedsListFinder({
    ...(isValidPetType(petType) && { petType }),
    ...(isValidSortOption(createdAt) && { sortBy: { createdAt } }),
    ...(isVaidPaginationQueryParams(pagination) && {
      skip: +pagination.limit * +pagination.page,
      take: +pagination.limit,
    }),
  });

  return httpHandler.ok(breed);
});
