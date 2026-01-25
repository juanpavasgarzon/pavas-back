import { SelectQueryBuilder } from 'typeorm';
import { SortOrder } from '../enums/sort-order.enum';
import { PaginationResponse } from '../dto/response/pagination.response';
import type { ParsedFilters } from '../interfaces/filter.interface';
import type {
  PaginateConfig,
  PaginateQueryOptions,
} from '../interfaces/paginate.interface';
import { decodeCursor, encodeCursor } from './cursor.util';
import { parseFiltersFromQuery } from './filter-parser.util';
import { applyCursorToQuery, applyFiltersToQuery } from './query-builder.util';

export async function paginate<
  T extends { id: string },
  Q extends PaginateQueryOptions = PaginateQueryOptions,
>(
  qb: SelectQueryBuilder<T>,
  query: Q,
  config: PaginateConfig,
): Promise<PaginationResponse<T>> {
  const {
    alias,
    searchFields = [],
    defaultSortBy = 'createdAt',
    defaultLimit = 20,
    maxLimit = 100,
  } = config;

  const {
    cursor,
    limit: queryLimit,
    sortBy = defaultSortBy,
    sortOrder = SortOrder.DESC,
  } = query;

  const limit = Math.min(queryLimit ?? defaultLimit, maxLimit);

  const filters: ParsedFilters = parseFiltersFromQuery(
    query as unknown as Record<string, unknown>,
  );

  applyFiltersToQuery(qb, filters, { alias, searchFields });

  let cursorId: string | undefined;
  let cursorValue: string | number | Date | undefined;

  if (cursor) {
    const decoded = decodeCursor(cursor);
    if (decoded) {
      cursorId = decoded.id;
      cursorValue = decoded.sortValue;
    }
  }

  applyCursorToQuery(qb, {
    alias,
    sortBy,
    sortOrder,
    cursorId,
    cursorValue,
  });

  qb.take(limit + 1);

  const items = await qb.getMany();
  const hasNextPage = items.length > limit;
  const data = hasNextPage ? items.slice(0, -1) : items;

  const lastItem = data[data.length - 1];
  const firstItem = data[0];

  const getSortValue = (item: T): string | number | Date => {
    return (item as Record<string, unknown>)[sortBy] as string | number | Date;
  };

  return new PaginationResponse(data, {
    hasNextPage,
    hasPreviousPage: !!cursor,
    nextCursor:
      hasNextPage && lastItem
        ? encodeCursor({ id: lastItem.id, sortValue: getSortValue(lastItem) })
        : null,
    previousCursor: firstItem
      ? encodeCursor({ id: firstItem.id, sortValue: getSortValue(firstItem) })
      : null,
    limit,
  });
}
