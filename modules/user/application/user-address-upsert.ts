import { User } from '@user/model';
import { Address } from '@shared/domain/address';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export const userAddressUpsert = async ({
  address,
  email,
}: {
  address: Address;
  email: User['email'];
}) => {
  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundError(
        `Not found user by "${email}" email to upsert address`
      );
    }

    const existAddress = user.addresses.some(
      ({ placeId }) => address.placeId === placeId
    );

    if (existAddress) {
      user = await prisma.user.update({
        where: { email },
        data: {
          addresses: {
            updateMany: { where: { placeId: address.placeId }, data: address },
          },
        },
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: {
          addresses: { set: [address] },
        },
      });
    }

    const { password, ...rest } = user;

    return rest;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failed to upsert address in the "${email}" user. ${error.message}`;
    }

    throw error;
  }
};
