import { Country } from '@country/model';
import { validateCountry } from '@country/application/country-validator';
import { EntityCreation } from '@shared/domain/entity';
import prisma from '@shared/application/prisma';

export const countryCreator = async (country: EntityCreation<Country>) => {
  try {
    validateCountry(country);

    const countryCreated = await prisma.country.create({
      data: {
        ...country,
        isoCode: country.isoCode.toLowerCase(),
      },
    });

    return countryCreated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to create the country. ${error.message}`;
    }

    throw error;
  }
};
