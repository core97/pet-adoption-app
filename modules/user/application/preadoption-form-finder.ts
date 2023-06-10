import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ConflictError } from '@shared/application/errors/conflict.error';
import { getFormResult } from '@shared/infra/typeform';

export const preadoptionFormFinder = async ({
  petAdId,
  preadoptionUserId,
  requestingUserId,
}: {
  petAdId: string;
  preadoptionUserId: string;
  requestingUserId: string;
}) => {
  const petAd = await prisma.petAd.findUnique({ where: { id: petAdId } });

  if (petAd?.userId !== requestingUserId) {
    throw new ConflictError(
      'Ad requesting the pre-adoption must be created by the user requesting the pre-adoption.'
    );
  }

  const petAdRequests = await prisma.petAdRequest.findMany({
    where: { petAdId },
  });

  const requestFromUser = petAdRequests.find(
    request => request.userId === preadoptionUserId
  );

  if (!requestFromUser) {
    throw new NotFoundError(`There is no request for the user's ad.`);
  }

  const user = await prisma.user.findUnique({
    where: { id: requestFromUser.id },
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
};
