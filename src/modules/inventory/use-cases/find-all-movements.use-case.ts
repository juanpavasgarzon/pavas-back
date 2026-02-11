import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { IInventoryMovement } from '../interfaces/inventory-movement.interface';
import { InventoryRepository } from '../repositories/inventory.repository';
import type { MovementsQueryRequest } from '../dto/request/movements-query.request';

@Injectable()
export class FindAllMovementsUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(
    query: MovementsQueryRequest,
  ): Promise<PaginationResponse<IInventoryMovement>> {
    const qb = this.inventoryRepository
      .createQueryBuilder('movement')
      .leftJoinAndSelect('movement.product', 'product');

    if (query.productId) {
      qb.andWhere('movement.productId = :productId', {
        productId: query.productId,
      });
    }
    if (query.type) {
      qb.andWhere('movement.type = :type', { type: query.type });
    }

    return paginate(qb, query, {
      alias: 'movement',
      searchFields: [],
      defaultSortBy: 'movementDate',
    });
  }
}
