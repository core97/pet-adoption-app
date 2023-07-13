import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { countryUpdaterById } from '@country/application/country-updater-by-id';

export const countryPatch = controller(
  async req => {
    const body = await req.json();

    const country = await countryUpdaterById({
      data: body.data,
      searchParam: body.searchParam,
    });

    return httpHandler.ok(country);
  },
  { roles: ['ADMIN'] }
);
