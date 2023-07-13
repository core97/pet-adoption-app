import { Country } from '@country/model';
import { validateCountry } from '@country/application/country-validator';
import prisma from '@shared/application/prisma';

export interface CountryUpdaterById {
  (params: {
    searchParam: Pick<Country, 'id'>;
    data: Partial<Country>;
  }): Promise<Country>;
}

export const countryUpdaterById: CountryUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    validateCountry(data);

    const country = await prisma.country.update({
      where: searchParam,
      data: {
        ...data,
        ...(data.isoCode && { isoCode: data.isoCode.toLowerCase() }),
      },
    });
    
    return country;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Country could not be updated by ${searchParam.id} id. ${error.message}`;
    }

    throw error;
  }
};
