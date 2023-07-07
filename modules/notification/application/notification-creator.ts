import { Notfication, NOTIFICATION_TYPES } from '@notification/model';
import prisma from '@shared/application/prisma';
import { PAGES } from '@shared/application/pages';

export interface NotificationCreator {
  (
    params:
      | {
          type: NOTIFICATION_TYPES.ACCEPTED_AS_OWNER;
          petAdId: string;
          userIdToNotify: string;
        }
      | {
          type: NOTIFICATION_TYPES.ACCEPTED_PREADOPTION_FORM;
          petAdId: string;
          userIdToNotify: string;
        }
      | {
          type: NOTIFICATION_TYPES.ADOPTION_REQUEST_CREATED;
          adoptionRequestId: string;
          petAdId: string;
          userIdToNotify: string;
        }
      | {
          type: NOTIFICATION_TYPES.DECLINED_PREADOPTION_FORM;
          petAdId: string;
          userIdToNotify: string;
        }
      | {
          type: NOTIFICATION_TYPES.DECLINED_PREADOPTION_FORM;
          petAdId: string;
          userIdToNotify: string;
        }
      | {
          type: NOTIFICATION_TYPES.YOUR_FAVOURITE_HAS_ALREADY_BEEN_ADOPTED;
          petAdId: string;
          userIdToNotify: string;
        }
  ): Promise<Notfication>;
}

export const notificationCreator: NotificationCreator = async params => {
  try {
    const petAd = await prisma.petAd.findUnique({
      where: { id: params.petAdId },
    });

    let url = '';
    if (
      [
        NOTIFICATION_TYPES.ACCEPTED_AS_OWNER,
        NOTIFICATION_TYPES.ACCEPTED_PREADOPTION_FORM,
        NOTIFICATION_TYPES.DECLINED_PREADOPTION_FORM,
        NOTIFICATION_TYPES.YOUR_FAVOURITE_HAS_ALREADY_BEEN_ADOPTED,
      ].includes(params.type)
    ) {
      url = `${PAGES.PET_AD_DETAIL}/${params.petAdId}`;
    } else if (
      [NOTIFICATION_TYPES.ADOPTION_REQUEST_CREATED].includes(params.type)
    ) {
      url = `${PAGES.ADOPTION_REQUESTS_LIST}/${params.petAdId}`;
    }

    const description: Record<NOTIFICATION_TYPES, string> = {
      [NOTIFICATION_TYPES.ACCEPTED_AS_OWNER]: `Enhorabuena has sido aceptado como dueño de ${petAd?.name}, serás contactado por el anunciante por mail.`,
      [NOTIFICATION_TYPES.ACCEPTED_PREADOPTION_FORM]: `Enhorabuena, tu formulario de preadopción es válido para adoptar a ${petAd?.name}. SIgue atento durante el proceso de adopción.`,
      [NOTIFICATION_TYPES.ADOPTION_REQUEST_CREATED]: `Han creado una nueva solicitud de adopción para ${petAd?.name}.`,
      [NOTIFICATION_TYPES.DECLINED_PREADOPTION_FORM]: `Lo sentimos, tu formulario de preadopción no es válido para adoptar a ${petAd?.name}.`,
      [NOTIFICATION_TYPES.YOUR_FAVOURITE_HAS_ALREADY_BEEN_ADOPTED]: `Lo sentimos, el anuncio de ${petAd?.name} que tenías marcado como favorito ya ha sido adoptado.`,
    };

    const notification = await prisma.notification.create({
      data: {
        description: description[params.type],
        type: params.type,
        userIdToNotify: params.userIdToNotify,
        ...(url && { url }),
      },
    });

    return notification;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failure to create notification of ${params.type} type. ${error.message}`;
    }

    throw error;
  }
};
