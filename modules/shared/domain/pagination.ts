export interface PaginationParams {
  page: number;
  limit: number;
}

export type PaginationQueryParams = {
  page: string;
  limit: string;
};

export interface PaginationResult<T> {
  total: number;
  results: T[];
}

export const isVaidPaginationQueryParams = (
  pagination: any
): pagination is PaginationQueryParams =>
  typeof pagination === 'object' &&
  Object.keys(pagination).length === 2 &&
  (['limit', 'page'] as (keyof PaginationQueryParams)[]).every(
    key =>
      key in pagination &&
      pagination[key] &&
      typeof pagination[key] === 'string' &&
      /^\d+$/.test(pagination[key])
  );

export const isValidPaginationParams = (
  pagination: any
): pagination is PaginationParams =>
  typeof pagination === 'object' &&
  Object.keys(pagination).length === 2 &&
  typeof pagination.page === 'number' &&
  typeof pagination.limit === 'number';
