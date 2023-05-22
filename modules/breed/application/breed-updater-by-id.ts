import { Breed } from '@breed/model';
import { validateBreed } from '@breed/application/breed-validator';
import { prisma } from '@shared/application/prisma';
import { deleteFile } from '@shared/infra/storage';

export interface BreedUpdaterById {
  (params: {
    searchParam: Pick<Breed, 'id'>;
    data: Partial<Breed>;
  }): Promise<Breed>;
}

export const breedUpdaterById: BreedUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    validateBreed(data);

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
