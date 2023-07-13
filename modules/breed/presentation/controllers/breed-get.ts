import { breedFinderById } from '@breed/application/breed-finder-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const breedGet = controller(async req => {
  if (!req.params?.id) {
    return httpHandler.invalidParams('Missing breed id');
  }

  const breed = await breedFinderById({ id: req.params?.id });

  return httpHandler.ok(breed);
});
