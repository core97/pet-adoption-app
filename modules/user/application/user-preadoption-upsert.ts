import { User, PreadoptionForm } from '@user/model';
import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';

export const userPreadoptionUpsert = async ({
  preadoptionForm,
  userId,
}: {
  preadoptionForm: PreadoptionForm;
  userId: User['id'];
}) => {
  try {
    const validPreadoptionFormsIds = ['GgL5zYYK'];

    if (!validPreadoptionFormsIds.includes(preadoptionForm.formId)) {
      throw new ConflictError('Preadoption form does not exist');
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        preadoptionForm,
      },
    });

    const { password, ...rest } = user;

    return rest;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failed to upsert preadoption form in the "${userId}" user. ${error.message}`;
    }

    throw error;
  }
};
