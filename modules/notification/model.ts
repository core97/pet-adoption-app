import {
  Notification as NotificationPrisma,
  NotificationType as NotificationTypePrisma,
} from '@prisma/client';

export type Notfication = NotificationPrisma;

export type NotficationType = NotificationTypePrisma;

export enum NOTIFICATION_TYPES {
  ACCEPTED_AS_OWNER = 'ACCEPTED_AS_OWNER',
  ACCEPTED_PREADOPTION_FORM = 'ACCEPTED_PREADOPTION_FORM',
  ADOPTION_REQUEST_CREATED = 'ADOPTION_REQUEST_CREATED',
  DECLINED_PREADOPTION_FORM = 'DECLINED_PREADOPTION_FORM',
  YOUR_FAVOURITE_HAS_ALREADY_BEEN_ADOPTED = 'YOUR_FAVOURITE_HAS_ALREADY_BEEN_ADOPTED',
}
