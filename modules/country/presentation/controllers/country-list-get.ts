import { countryListFinder } from '@country/application/country-list-finder';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const countryListGet = controller(async req => {
  const { searchParams } = new URL(req.url);
  const [isAvailableToSearch] = ['isAvailableToSearch'].map(param =>
    searchParams.get(param)
  );

  const countries = await countryListFinder({
    ...((isAvailableToSearch === 'false' || isAvailableToSearch === 'true') && {
      isAvailableToSearch: JSON.parse(isAvailableToSearch),
    }),
  });

  return httpHandler.ok(countries);
});
