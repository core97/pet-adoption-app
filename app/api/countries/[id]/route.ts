import { countryGet } from '@country/presentation/controllers/country-get';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  request.params = params;
  const res = await countryGet.run(request);
  return res;
}
