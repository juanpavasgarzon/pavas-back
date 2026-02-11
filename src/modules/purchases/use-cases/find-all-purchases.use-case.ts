import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { IPurchase } from '../interfaces/purchase.interface';
import { PurchasesRepository } from '../repositories/purchases.repository';
import type { PurchasesQueryRequest } from '../dto/request/purchases-query.request';

@Injectable()
export class FindAllPurchasesUseCase {
  constructor(private readonly purchasesRepository: PurchasesRepository) {}

  async execute(
    query: PurchasesQueryRequest,
  ): Promise<PaginationResponse<IPurchase>> {
    const qb = this.purchasesRepository.createQueryBuilder('purchase');
    if (query.purchaseOrderId) {
      qb.andWhere('purchase.purchaseOrderId = :purchaseOrderId', {
        purchaseOrderId: query.purchaseOrderId,
      });
    }
    return paginate(qb, query, {
      alias: 'purchase',
      searchFields: ['number'],
    });
  }
}
