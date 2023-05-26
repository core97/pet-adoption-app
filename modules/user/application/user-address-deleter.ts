import { User } from '@user/model';
import { Address } from '@shared/domain/address';
import { prisma } from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ConflictError } from '@shared/application/errors/conflict.error';

export const userAddressDeleter = async ({
  placeId,
  email,
}: {
  placeId: Address['placeId'];
  email: User['email'];
}) => {
  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundError(
        `Not found user by "${email}" email to delete address`
      );
    }

    const addresses = user.addresses.filter(
      address => placeId !== address.placeId
    );

    if (addresses.length === user.addresses.length) {
      throw new ConflictError(
        `"${placeId}" address to be deleted does not belong to the "${email}" user`
      );
    }

    user = await prisma.user.update({ where: { email }, data: { addresses } });

    const { password, ...rest } = user;

    return rest;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failed to delete address from user. ${error.message}`;
    }

    throw error;
  }
};
