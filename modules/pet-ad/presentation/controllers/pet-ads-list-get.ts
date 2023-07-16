import { petAdsListFinderByCountry } from '@pet-ad/application/pet-ad-list-finder-by-country';
import { countryListFinder } from '@country/application/country-list-finder';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { isValidPetType } from '@shared/domain/pet-type';
import { isValidGender } from '@shared/domain/gender';
import { isVaidPaginationQueryParams } from '@shared/domain/pagination';
import { isValidSortOption } from '@shared/domain/sort-by';

export const petAdsListGet = controller(async req => {
  const { searchParams } = new URL(req.url);

  const [country, petType, limit, page, createdAt, dateBirth, gender] = [
    'country',
    'petType',
    'limit',
    'page',
    'createdAt',
    'dateBirth',
    'gender',
  ].map(param => searchParams.get(param));

  const [breedIds] = ['breedIds'].map(param => searchParams.getAll(param));

  const pagination = { page, limit };

  const countries = await countryListFinder({ isAvailableToSearch: true });

  if (!country) {
    return httpHandler.invalidParams('Missing country');
  }

  if (!countries.some(({ isoCode }) => isoCode === country?.toLowerCase())) {
    return httpHandler.notAcceptable('Country not available');
  }

  const petAds = await petAdsListFinderByCountry({
    country,
    ...(isValidPetType(petType) && { petType }),
    ...(isValidGender(gender) && { gender }),
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
