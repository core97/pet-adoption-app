import { petAdGet } from '@pet-ad/presentation/controllers/pet-ad-get';

export async function GET(request: Request) {
  const res = await petAdGet.run(request);
  return res;
}
