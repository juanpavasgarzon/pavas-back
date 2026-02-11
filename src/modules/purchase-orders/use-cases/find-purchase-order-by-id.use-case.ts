import { Injectable, NotFoundException } from '@nestjs/common';
import type { IPurchaseOrder } from '../interfaces/purchase-order.interface';
import { PurchaseOrdersRepository } from '../repositories/purchase-orders.repository';

@Injectable()
export class FindPurchaseOrderByIdUseCase {
  constructor(
    private readonly purchaseOrdersRepository: PurchaseOrdersRepository,
  ) {}

  async execute(id: string, withItems = true): Promise<IPurchaseOrder> {
    const order = await this.purchaseOrdersRepository.findById(id, withItems);
    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }
    return order;
  }
}
