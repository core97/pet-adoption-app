import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export const userAddressesFinder = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new NotFoundError(
      `Not found user by "${email}" email to get addresses`
    );
  }

  const { addresses } = user;

  return addresses;
};
