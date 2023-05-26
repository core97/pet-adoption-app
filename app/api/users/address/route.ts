import { userAddressDelete } from '@user/presentation/controllers/user-address-delete';
import { userAddressesGet } from '@user/presentation/controllers/user-addresses-get';
import { userAddressPut } from '@user/presentation/controllers/user-address-put';

export async function DELETE(request: Request) {
  const res = await userAddressDelete.run(request);
  return res;
}

export async function GET(request: Request) {
  const res = await userAddressesGet.run(request);
  return res;
}

export async function PUT(request: Request) {
  const res = await userAddressPut.run(request);
  return res;
}
