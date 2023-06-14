import { addressPut } from '@shared/presentation/controllers/address-put';

export async function PUT(request: Request) {
  const res = await addressPut.run(request);
  return res;
}
