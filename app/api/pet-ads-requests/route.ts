import { petAdRequestPost } from '@/modules/pet-ad-request/presentation/controllers/pet-ad-request-post';

export async function POST(request: Request) {
  const res = await petAdRequestPost.run(request);
  return res;
}
