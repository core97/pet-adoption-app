import type {
  AdoptionStep,
  PetAdRequest,
  PetAdRequestStatus,
} from '@adoption-request/model';
import { fetcher } from '@shared/application/fetcher';
import type { EntityCreation } from '@shared/domain/entity';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/adoption-requests`;

export const PET_AD_REQUEST_CACHE_TAGS = {};

export const createAdoptionRequest = async (
  petAdRequest: Omit<EntityCreation<PetAdRequest>, 'userId' | 'steps'>
) => {
  const res = await fetcher<PetAdRequest>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(petAdRequest),
    cache: 'no-cache',
  });

  return res;
};

export const updateAdoptionStepById = async ({
  adoptionStep,
  petAdRequestId,
}: {
  petAdRequestId: string;
  adoptionStep: AdoptionStep;
}) => {
  const res = await fetcher<PetAdRequest>(`${BASE_URL}/step`, {
    method: 'PUT',
    body: JSON.stringify({ adoptionStep, petAdRequestId }),
    cache: 'no-cache',
  });

  return res;
};

export const updateAdoptionStatusById = async ({
  status,
  petAdRequestId,
}: {
  petAdRequestId: string;
  status: PetAdRequestStatus;
}) => {
  const res = await fetcher<PetAdRequest>(`${BASE_URL}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, petAdRequestId }),
    cache: 'no-cache',
  });

  return res;
};
