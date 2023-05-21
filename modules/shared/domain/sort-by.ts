type SortOption = 'asc' | 'desc';

export type SortBy<T extends Record<string, any>> = {
  [key in keyof T]?: SortOption;
};

export const isValidSortOption = (sortOption: any): sortOption is SortOption =>
  typeof sortOption === 'string' &&
  ['asc', 'desc'].some(item => item === sortOption);
