import { prisma } from '@shared/application/prisma';

export const userPrivateFinderByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const { password, ...rest } = user;

  return rest;
};
