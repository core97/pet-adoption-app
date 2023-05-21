import { breedPost } from '@breed/presentation/controllers/breed-post';
import { breedsListGet } from '@breed/presentation/controllers/breeds-list-get';
import { breedPatch } from '@breed/presentation/controllers/breed-patch';

export async function POST(request: Request) {
  const res = await breedPost.run(request);
  return res;
}

export async function GET(request: Request) {
  const res = await breedsListGet.run(request);
  return res;
}

export async function PATCH(request: Request) {
  const res = await breedPatch.run(request);
  return res;
}
