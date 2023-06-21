import prisma from '@shared/application/prisma';
import { ConflictError } from '@shared/application/errors/conflict.error';
import { getFormResult } from '@shared/infra/typeform';

export const preadoptionFormFinder = async ({
  adoptionRequestId,
  requestingUserId,
}: {
  adoptionRequestId: string;
  requestingUserId: string;
}) => {
  try {
    const adoptionRequest = await prisma.adoptionRequest.findUniqueOrThrow({
      where: { id: adoptionRequestId },
      include: { petAd: true },
    });

    const { petAd } = adoptionRequest;

    if (petAd?.userId !== requestingUserId) {
      throw new ConflictError(
        'Ad requesting the pre-adoption must be created by the user requesting the pre-adoption.'
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: adoptionRequest.userId },
    });

    if (!user?.preadoptionForm) {
      throw new ConflictError(
        'User has not yet filled in the pre-adoption form.'
      );
    }

    const formResult = await getFormResult(
      user.preadoptionForm.formId,
      user.preadoptionForm.responseId
    );

    return formResult;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to get preadoption form from "${adoptionRequestId}" adoption request of this "${requestingUserId}" requesting user. ${error.message}`;
    }

    throw error;
  }
};
