import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { createBreed } from '@breed/application/breed-creator';

export const breedPost = controller(
  async req => {
    const body = await req.json();

    const breed = await createBreed(body);

    return httpHandler.ok(breed);
  },
  { roles: ['ADMIN'] }
);
