type SetAsPartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type EntityCreation<T extends Record<string, any>> = SetAsPartial<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;
