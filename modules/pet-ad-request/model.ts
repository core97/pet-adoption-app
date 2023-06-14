import {
  PetAdRequest as PetAdRequestPrisma,
  AdoptionStepType as AdoptionStepTypePrisma,
  RequestStatus as RequestStatusPrisma,
  AdoptionStep as AdoptionStepPrisma,
} from '@prisma/client';

export type PetAdRequest = PetAdRequestPrisma;

export type PetAdRequestStatus = RequestStatusPrisma;

export type AdoptionStepType = AdoptionStepTypePrisma;

export type AdoptionStep = AdoptionStepPrisma;

export const PET_AD_REQUEST_STATUSES: Record<
  PetAdRequestStatus,
  PetAdRequestStatus
> = {
  ACCEPTED: 'ACCEPTED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
};

export const ADOPTION_STEPS_TYPES: Record<AdoptionStepType, AdoptionStepType> =
  {
    PREADOPTION_FORM: 'PREADOPTION_FORM',
  };

export function sortByStatus<T extends PetAdRequest>(
  array: T[],
  order: PetAdRequestStatus[]
) {
  array.sort((a, b) => {
    const statusA = order.indexOf(a.status);
    const statusB = order.indexOf(b.status);

    return statusA - statusB;
  });

  return array;
}
