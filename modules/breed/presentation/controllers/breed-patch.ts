import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { breedUpdaterById } from '@breed/application/breed-updater-by-id';

export const breedPatch = controller(
  async req => {
    const body = await req.json();

    const breed = await breedUpdaterById({
      data: body.data,
      searchParam: body.searchParam,
    });

    return httpHandler.ok(breed);
  },
  { roles: ['ADMIN'] }
);
