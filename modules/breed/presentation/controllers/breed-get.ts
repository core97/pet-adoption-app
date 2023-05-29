import { breedFinderById } from '@breed/application/breed-finder-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const breedGet = controller(async req => {
  const breedId = req.url.split('/').at(-1);

  if (!breedId) {
    return httpHandler.invalidParams('Missing breed id');
  }

  const breed = await breedFinderById({ id: breedId });

  return httpHandler.ok(breed);
});
