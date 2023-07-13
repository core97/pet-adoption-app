import { countryPost } from '@country/presentation/controllers/country-post';
import { countryListGet } from '@country/presentation/controllers/country-list-get';
import { countryPatch } from '@country/presentation/controllers/country-patch';

export async function POST(request: Request) {
  const res = await countryPost.run(request);
  return res;
}

export async function GET(request: Request) {
  const res = await countryListGet.run(request);
  return res;
}

export async function PATCH(request: Request) {
  const res = await countryPatch.run(request);
  return res;
}
