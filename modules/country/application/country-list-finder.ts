import { Country } from '@country/model';
import prisma from '@shared/application/prisma';

export interface CountriesListFinder {
  (params?: Partial<Pick<Country, 'isAvailableToSearch'>>): Promise<Country[]>;
}

export const countryListFinder: CountriesListFinder = async ({
  isAvailableToSearch,
} = {}) => {
  const countries = await prisma.country.findMany({
    where: {
      ...(typeof isAvailableToSearch === 'boolean' && { isAvailableToSearch }),
    },
  });

  return countries;
};
