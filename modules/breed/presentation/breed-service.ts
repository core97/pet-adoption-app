import { Breed } from '@breed/model';
import { EntityCreation } from '@shared/domain/entity';
import { fetcher } from '@shared/application/fetcher';

export const createBreed = async (breed: EntityCreation<Breed>) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_URL}/api/breeds`, {
    method: 'POST',
    body: JSON.stringify(breed),
  });

  return res;
};
