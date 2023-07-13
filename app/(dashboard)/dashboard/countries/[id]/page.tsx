import { CountryFormUpdate } from '@country/presentation/components/CountryFormUpdate';
import { getCountryById } from '@country/presentation/country-fetcher';

const CountryDetailDashboard = async ({
  params,
}: {
  params: { id: string };
}) => {
  const country = await getCountryById({ data: { id: params.id } });

  return (
    <CountryFormUpdate
      defaultValue={{
        isAvailableToSearch: country.isAvailableToSearch,
        isoCode: country.isoCode,
        name: country.name,
      }}
    />
  );
};

export default CountryDetailDashboard;
