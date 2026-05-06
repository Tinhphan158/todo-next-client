export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: PaginationMeta;
}
