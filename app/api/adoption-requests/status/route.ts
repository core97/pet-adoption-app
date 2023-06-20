import { adoptionStatusPut } from '@adoption-request/presentation/controllers/adoption-status-put';

export async function PUT(request: Request) {
  const res = await adoptionStatusPut.run(request);
  return res;
}
