import { FilterOperator } from '../enums/filter-operator.enum';
import type {
  FilterCondition,
  ParsedFilters,
} from '../interfaces/filter.interface';

const PAGINATION_FIELDS = ['cursor', 'limit', 'sortBy', 'sortOrder', 'search'];

export function parseFilterValue(
  value: string,
): { operator: FilterOperator; value: unknown } | null {
  if (!value || value === '') {
    return null;
  }

  const operatorMatch = value.match(/^([a-z]+):(.*)$/i);
  if (operatorMatch) {
    return parseWithOperator(operatorMatch[1], operatorMatch[2], value);
  }

  return parseWithoutOperator(value);
}

function parseWithOperator(
  op: string,
  val: string,
  originalValue: string,
): { operator: FilterOperator; value: unknown } {
  const operator = op.toLowerCase() as FilterOperator;

  const isValidOperator = Object.values(FilterOperator).includes(operator);
  if (!isValidOperator) {
    return { operator: FilterOperator.EQ, value: originalValue };
  }

  if (operator === FilterOperator.IN || operator === FilterOperator.NIN) {
    const arrayValue = val.split(',').map((v) => v.trim());
    return { operator, value: arrayValue };
  }

  const parsedValue = parseValue(val);
  return { operator, value: parsedValue };
}

function parseWithoutOperator(value: string): {
  operator: FilterOperator;
  value: unknown;
} {
  const parsedValue = parseValue(value);
  return { operator: FilterOperator.EQ, value: parsedValue };
}

function parseValue(val: string): unknown {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  const numValue = Number(val);
  if (!isNaN(numValue) && val !== '') {
    return numValue;
  }

  return val;
}

export function parseFiltersFromQuery<T extends Record<string, unknown>>(
  query: T,
  excludeFields: string[] = [],
): ParsedFilters {
  const excluded = [...PAGINATION_FIELDS, ...excludeFields];
  const conditions: FilterCondition[] = [];
  let search: string | undefined;

  for (const [key, rawValue] of Object.entries(query)) {
    if (excluded.includes(key)) {
      if (key === 'search' && typeof rawValue === 'string') {
        search = rawValue;
      }
      continue;
    }

    if (rawValue === undefined || rawValue === null || rawValue === '') {
      continue;
    }

    const parsed = parseFilterValue(rawValue as string);
    if (parsed) {
      conditions.push({
        field: key,
        operator: parsed.operator,
        value: parsed.value,
      });
    }
  }

  return { conditions, search };
}
