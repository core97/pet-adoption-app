import { breedPost } from '@breed/presentation/controllers/breed-post';

export async function POST(request: Request) {
  const res = await breedPost.run(request);
  return res;
}
