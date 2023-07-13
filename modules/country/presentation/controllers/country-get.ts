import { countryFinderById } from '@country/application/country-finder-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const countryGet = controller(async req => {
  if (!req.params?.id) {
    return httpHandler.invalidParams('Missing country id');
  }

  const country = await countryFinderById({ id: req.params.id });

  return httpHandler.ok(country);
});
