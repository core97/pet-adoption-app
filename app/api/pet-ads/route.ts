import { petAdPost } from '@pet-ad/presentation/controllers/pet-ad-post';

export async function POST(request: Request) {
  const res = await petAdPost.run(request);
  return res;
}
