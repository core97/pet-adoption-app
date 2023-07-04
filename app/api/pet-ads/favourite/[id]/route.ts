import { petAdAsFavouritePut } from '@pet-ad/presentation/controllers/pet-ad-as-favourite-put';

export async function PUT(request: Request) {
  const res = await petAdAsFavouritePut.run(request);
  return res;
}
