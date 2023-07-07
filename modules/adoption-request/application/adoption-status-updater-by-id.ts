import { PetAdRequest } from '@adoption-request/model';
import { NOTIFICATION_TYPES } from '@notification/model';
import { notificationCreator } from '@notification/application/notification-creator';
import prisma from '@shared/application/prisma';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';
import { ConflictError } from '@shared/application/errors/conflict.error';

export interface AdoptionStatusUpdaterById {
  (params: {
    searchParam: Pick<PetAdRequest, 'id'>;
    data: Pick<PetAdRequest, 'status'> & { updaterUserId: string };
  }): Promise<PetAdRequest>;
}

export const adoptionStatusUpdaterById: AdoptionStatusUpdaterById = async ({
  data,
  searchParam,
}) => {
  try {
    if (data.status === 'PENDING') {
      throw new ConflictError(
        'It is not possible to update an status with "PENDING" because it is the default status.'
      );
    }

    const adoptionRequest = await prisma.adoptionRequest.findUnique({
      where: { id: searchParam.id },
    });

    if (!adoptionRequest) {
      throw new NotFoundError('Not found adoption requests.');
    }

    const petAd = await prisma.petAd.findUnique({
      where: { id: adoptionRequest.petAdId },
      include: { requests: { select: { userId: true } } },
    });

    if (!petAd) {
      throw new NotFoundError('Not found pet ad from adoption request.');
    }

    if (petAd.userId !== data.updaterUserId) {
      throw new ForbiddenError(
        `User ${data.updaterUserId} is unable to update the adoption status.`
      );
    }

    const adoptionRequestsList = await prisma.adoptionRequest.findMany({
      where: { petAdId: adoptionRequest.petAdId },
    });

    if (
      petAd.adoptionStatus === 'ADOPTED' ||
      adoptionRequestsList.some(({ status }) => status === 'ACCEPTED')
    ) {
      throw new ConflictError('Pet has already been adopted.');
    }

    if (data.status === 'ACCEPTED') {
      const stepsAreAccepted = adoptionRequest.steps.every(
        ({ status }) => status === 'ACCEPTED'
      );

      if (!stepsAreAccepted) {
        throw new ConflictError(
          'You cannot upgrade to accepted if the adoption steps are not accepted.'
        );
      }
    }

    const adoptionRequestUpdated = await prisma.adoptionRequest.update({
      where: { id: searchParam.id },
      data: { status: data.status },
    });

    if (data.status === 'ACCEPTED') {
      await Promise.all([
        prisma.petAd.update({
          where: { id: petAd.id },
          data: { adoptionStatus: 'ADOPTED' },
        }),
        notificationCreator({
          type: NOTIFICATION_TYPES.ACCEPTED_AS_OWNER,
          petAdId: petAd.id,
          userIdToNotify: adoptionRequestUpdated.userId,
        }),
        ...petAd.requests.map(({ userId }) =>
          notificationCreator({
            type: NOTIFICATION_TYPES.YOUR_FAVOURITE_HAS_ALREADY_BEEN_ADOPTED,
            petAdId: petAd.id,
            userIdToNotify: userId,
          })
        ),
      ]);
    }

    return adoptionRequestUpdated;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to update adoption status by "${searchParam.id}" id. ${error.message}`;
    }

    throw error;
  }
};
