import { Address } from '@shared/domain/address';
import { fetcher } from '@shared/application/fetcher';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export const addressValidator = async ({
  address,
  options = {},
}: {
  address: Pick<
    Address,
    'city' | 'country' | 'postalCode' | 'streetName' | 'streetNumber'
  >;
  options?: { lang?: string };
}): Promise<Address> => {
  const formattedAddress = `${address.streetName} ${address.streetNumber}, ${address.postalCode} ${address.city}, ${address.country}`;

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.API_KEY_GOOGLE_CLOUD_PLATFORM}`;

  if (options.lang) {
    url += `&language=${options.lang}`;
  }

  const response = await fetcher<any>(url);

  if (!response?.results?.length) {
    throw new NotFoundError(`Not found the address "${formattedAddress}"`);
  }

  const [addressFromGoogle] = response.results;

  const streetName = addressFromGoogle.address_components.find(
    (component: any) => component.types.includes('route')
  )?.long_name;

  const city = addressFromGoogle.address_components.find((component: any) =>
    component.types.includes('administrative_area_level_2')
  )?.long_name;

  const country = addressFromGoogle.address_components.find((component: any) =>
    component.types.includes('country')
  )?.short_name;

  const postalCode = addressFromGoogle.address_components.find(
    (component: any) => component.types.includes('postal_code')
  )?.short_name;

  const streetNumber = addressFromGoogle.address_components.find(
    (component: any) => component.types.includes('street_number')
  )?.short_name;

  const { lat, lng } = addressFromGoogle.geometry?.location || {};

  const placeId = addressFromGoogle.place_id || addressFromGoogle.vicinity;

  const displayName = addressFromGoogle.formatted_address;

  const isValidAddress = [
    lat,
    lng,
    city,
    country,
    placeId,
    displayName,
    postalCode,
    streetName,
  ].every(Boolean);

  if (!isValidAddress) {
    throw new NotFoundError(`Invalid address. "${formattedAddress}"`);
  }

  return {
    coordinates: { lat, lng },
    city,
    country,
    placeId,
    displayName,
    postalCode,
    streetName,
    ...(streetNumber && { streetNumber }),
  };
};
