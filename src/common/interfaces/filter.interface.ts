import type { FilterOperator } from '../enums/filter-operator.enum';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface ParsedFilters {
  conditions: FilterCondition[];
  search?: string;
}

export interface ApplyFiltersOptions {
  alias: string;
  searchFields?: string[];
}
