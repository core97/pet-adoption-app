import { petAdPost } from '@pet-ad/presentation/controllers/pet-ad-post';
import { petAdPatch } from '@pet-ad/presentation/controllers/pet-ad-patch';
import { petAdsListGet } from '@pet-ad/presentation/controllers/pet-ads-list-get';

export async function GET(request: Request) {
  const res = await petAdsListGet.run(request);
  return res;
}

export async function PATCH(request: Request) {
  const res = await petAdPatch.run(request);
  return res;
}

export async function POST(request: Request) {
  const res = await petAdPost.run(request);
  return res;
}
