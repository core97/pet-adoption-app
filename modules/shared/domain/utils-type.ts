export type RecursiveObject<T = any> = { [key: string]: RecursiveObject<T> | T };
