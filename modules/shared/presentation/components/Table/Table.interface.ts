export interface TableProps<T> {
  rows: T[];
  columns: (keyof T)[];
  enableGlobalFilter?: boolean;
  isLoading?: boolean;
  onClickRow?: (row: T) => void;
  onChangePage?: (page: number) => void;
  page?: number;
  total?: number;
}

export type RowType = string | number | boolean | Date;
