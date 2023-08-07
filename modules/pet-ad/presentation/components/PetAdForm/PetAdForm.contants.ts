import { PetAd } from '@pet-ad/model';

export const petCheckpoints: Array<{
  label: string;
  value: keyof PetAd['checkpoints'];
}> = [
  { label: 'Tengo alguna alergia', value: 'hasAllergy' },
  { label: 'Tengo puesto el microchip', value: 'hasMicrochip' },
  { label: 'Estoy desparasitado externamente', value: 'isDewormedExternally' },
  { label: 'Estoy desparasitado internamente', value: 'isDewormedInternally' },
  { label: 'Estoy esterilizado', value: 'isSterilised' },
  { label: 'Tengo las vacunas al día', value: 'vaccinesUpToDate' },
];
