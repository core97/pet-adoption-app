import prisma from '@shared/application/prisma';

export const countryFinderById = async ({ id }: { id: string }) => {
  try {
    const country = await prisma.country.findUniqueOrThrow({
      where: { id },
    });

    return country;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to get country by ${id} id. ${error.message}`;
    }

    throw error;
  }
};
