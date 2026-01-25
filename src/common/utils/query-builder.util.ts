import { SelectQueryBuilder } from 'typeorm';
import { FilterOperator } from '../enums/filter-operator.enum';
import { SortOrder } from '../enums/sort-order.enum';
import type {
  ApplyFiltersOptions,
  FilterCondition,
  ParsedFilters,
} from '../interfaces/filter.interface';

export function applyFiltersToQuery<T extends object>(
  qb: SelectQueryBuilder<T>,
  filters: ParsedFilters,
  options: ApplyFiltersOptions,
): void {
  const { alias, searchFields = [] } = options;

  for (const condition of filters.conditions) {
    applyCondition(qb, condition, alias);
  }

  if (filters.search && searchFields.length > 0) {
    const searchConditions = searchFields
      .map((field) => `${alias}.${field} ILIKE :search`)
      .join(' OR ');
    qb.andWhere(`(${searchConditions})`, { search: `%${filters.search}%` });
  }
}

function applyCondition<T extends object>(
  qb: SelectQueryBuilder<T>,
  condition: FilterCondition,
  alias: string,
): void {
  const { field, operator, value } = condition;
  const column = `${alias}.${field}`;
  const paramName = `${field}_${Date.now()}`;

  switch (operator) {
    case FilterOperator.EQ:
      qb.andWhere(`${column} = :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.NEQ:
      qb.andWhere(`${column} != :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.LIKE:
      qb.andWhere(`${column} ILIKE :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.GT:
      qb.andWhere(`${column} > :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.GTE:
      qb.andWhere(`${column} >= :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.LT:
      qb.andWhere(`${column} < :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.LTE:
      qb.andWhere(`${column} <= :${paramName}`, { [paramName]: value });
      break;
    case FilterOperator.IN:
      qb.andWhere(`${column} IN (:...${paramName})`, { [paramName]: value });
      break;
    case FilterOperator.NIN:
      qb.andWhere(`${column} NOT IN (:...${paramName})`, {
        [paramName]: value,
      });
      break;
  }
}

export function applyCursorToQuery<T extends object>(
  qb: SelectQueryBuilder<T>,
  options: {
    alias: string;
    sortBy: string;
    sortOrder: SortOrder;
    cursorId?: string;
    cursorValue?: string | number | Date;
  },
): void {
  const { alias, sortBy, sortOrder, cursorId, cursorValue } = options;

  if (cursorId && cursorValue !== undefined) {
    const operator = sortOrder === SortOrder.DESC ? '<' : '>';
    qb.andWhere(
      `(${alias}.${sortBy} ${operator} :cursorValue) OR (${alias}.${sortBy} = :cursorValue AND ${alias}.id ${operator} :cursorId)`,
      { cursorValue, cursorId },
    );
  }

  qb.orderBy(`${alias}.${sortBy}`, sortOrder).addOrderBy(
    `${alias}.id`,
    sortOrder,
  );
}
