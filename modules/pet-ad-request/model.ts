import {
  PetAdRequest as PetAdRequestPrisma,
  AdoptionStepType as AdoptionStepTypePrisma,
  RequestStatus,
} from '@prisma/client';

export type PetAdRequest = PetAdRequestPrisma;

export type PetAdRequestStatus = RequestStatus;

export type AdoptionStepType = AdoptionStepTypePrisma;

export const ADOPTION_STEPS_TYPES: Record<AdoptionStepType, AdoptionStepType> =
  {
    MEETING: 'MEETING',
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
