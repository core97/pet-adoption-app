import { adoptionRequestPost } from '@adoption-request/presentation/controllers/adoption-request-post';

export async function POST(request: Request) {
  const res = await adoptionRequestPost.run(request);
  return res;
}
