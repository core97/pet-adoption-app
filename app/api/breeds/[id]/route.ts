import { breedGet } from '@breed/presentation/controllers/breed-get';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  request.params = params;
  const res = await breedGet.run(request);
  return res;
}
