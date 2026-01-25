import type { SortOrder } from '../enums/sort-order.enum';

export interface PaginateQueryOptions {
  cursor?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
}

export interface PaginateConfig {
  alias: string;
  searchFields?: string[];
  defaultSortBy?: string;
  defaultLimit?: number;
  maxLimit?: number;
}
