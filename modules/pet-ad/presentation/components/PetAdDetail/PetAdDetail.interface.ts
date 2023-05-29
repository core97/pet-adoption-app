import { getPetAdById } from '@pet-ad/presentation/pet-ad-fetcher';

export interface PetAdDetailProps {
  petAd: Awaited<ReturnType<typeof getPetAdById>>;
}
