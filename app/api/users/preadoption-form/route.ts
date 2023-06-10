import { userPreadoptionFormPut } from '@user/presentation/controllers/user-preadiotion-form-put';

export async function PUT(request: Request) {
  const res = await userPreadoptionFormPut.run(request);
  return res;
}
