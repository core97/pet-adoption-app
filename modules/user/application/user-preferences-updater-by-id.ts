import { User } from '@user/model';
import { validateBreed } from '@breed/application/breed-validator';
import prisma from '@shared/application/prisma';
import { deleteFile } from '@shared/infra/storage';

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
    
    if (data.images?.length) {
      const oldBreed = await prisma.breed.findUnique({
        where: { id: searchParam.id },
        select: { images: true },
      });

      await Promise.all(
        (oldBreed?.images || []).map(item => deleteFile(item.publicId))
      );
    }

    const breed = await prisma.breed.update({ where: searchParam, data });
    return breed;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Breed could not be updated by id. ${error.message}`;
    }

    throw error;
  }
};
