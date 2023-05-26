import { breedGet } from '@breed/presentation/controllers/breed-get';

export async function GET(request: Request) {
  const res = await breedGet.run(request);
  return res;
}
