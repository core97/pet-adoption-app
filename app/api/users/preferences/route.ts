import { userPreferencePut } from '@user/presentation/controllers/user-preferences-put';

export async function PUT(request: Request) {
  const res = await userPreferencePut.run(request);
  return res;
}
