import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { IPurchaseOrder } from '../interfaces/purchase-order.interface';
import { PurchaseOrdersRepository } from '../repositories/purchase-orders.repository';
import type { PurchaseOrdersQueryRequest } from '../dto/request/purchase-orders-query.request';

@Injectable()
export class FindAllPurchaseOrdersUseCase {
  constructor(
    private readonly purchaseOrdersRepository: PurchaseOrdersRepository,
  ) {}

  async execute(
    query: PurchaseOrdersQueryRequest,
  ): Promise<PaginationResponse<IPurchaseOrder>> {
    const qb =
      this.purchaseOrdersRepository.createQueryBuilder('purchase_order');
    if (query.status) {
      qb.andWhere('purchase_order.status = :status', { status: query.status });
    }
    return paginate(qb, query, {
      alias: 'purchase_order',
      searchFields: ['number'],
    });
  }
}
