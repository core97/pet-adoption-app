import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { countryCreator } from '@country/application/country-creator';

export const countryPost = controller(
  async req => {
    const body = await req.json();

    const country = await countryCreator(body);

    return httpHandler.ok(country);
  },
  { roles: ['ADMIN'] }
);
