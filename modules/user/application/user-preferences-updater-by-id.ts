import { User } from '@user/model';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface UserPreferencesUpdaterById {
  (params: {
    searchParam: Pick<User, 'id'>;
    data: Partial<User['preferences']>;
  }): Promise<User>;
}

export const userPreferencesUpdaterById: UserPreferencesUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    if (data?.searchCountry) {
      const country = await prisma.country.findUnique({
        where: { isoCode: data.searchCountry },
      });

      if (!country) {
        throw new ConflictError(
          `Not found country by ${data.searchCountry} iso code`
        );
      }
    }

    const user = await prisma.user.update({
      where: searchParam,
      data: {
        preferences: {
          ...(data?.searchCountry && {
            searchCountry: data.searchCountry.toLowerCase(),
          }),
        },
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `User preferences could not be updated by ${searchParam.id} id. ${error.message}`;
    }

    throw error;
  }
};
