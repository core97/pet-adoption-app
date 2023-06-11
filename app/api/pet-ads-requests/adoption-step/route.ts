import { adoptionStepsPut } from '@pet-ad-request/presentation/controllers/adoption-steps-put';

export async function PUT(request: Request) {
  const res = await adoptionStepsPut.run(request);
  return res;
}
