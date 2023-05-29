import { petAdsListFinderByCountry } from '@pet-ad/application/pet-ad-list-finder-by-country';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { isValidPetType } from '@shared/domain/pet-type';
import { isVaidPaginationQueryParams } from '@shared/domain/pagination';
import { isValidSortOption } from '@shared/domain/sort-by';
import { isValidCountryIso } from '@shared/domain/country-iso';

export const petAdsListGet = controller(async req => {
  const { searchParams } = new URL(req.url);

  const [country, petType, limit, page, createdAt, dateBirth] = [
    'country',
    'petType',
    'limit',
    'page',
    'createdAt',
    'dateBirth',
  ].map(param => searchParams.get(param));

  const [breedIds] = ['breedIds'].map(param => searchParams.getAll(param));

  const pagination = { page, limit };

  if (!isValidCountryIso(country)) {
    return httpHandler.invalidParams('Invalid country');
  }

  const petAds = await petAdsListFinderByCountry({
    country,
    ...(isValidPetType(petType) && { petType }),
    ...(breedIds.length && { breedIds }),
    ...(isValidSortOption(createdAt) && { sortBy: { createdAt } }),
    ...(isValidSortOption(dateBirth) && { sortBy: { dateBirth } }),
    ...(isVaidPaginationQueryParams(pagination) && {
      skip: +pagination.limit * +pagination.page,
      take: +pagination.limit,
    }),
  });

  return httpHandler.ok(petAds);
});
