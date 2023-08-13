import { SortByOptions } from './PetAdsFilterDrawer.interface';

export const isValidSorTypeOptions = (
  sortByType: any
): sortByType is SortByOptions =>
  typeof sortByType === 'string' &&
  Object.values(SortByOptions).some(item => item === sortByType);
