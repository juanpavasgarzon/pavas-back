import { Injectable, NotFoundException } from '@nestjs/common';
import type { IPurchaseOrder } from '../interfaces/purchase-order.interface';
import { PurchaseOrderStatus } from '../enums/purchase-order-status.enum';
import { PurchaseOrdersRepository } from '../repositories/purchase-orders.repository';

@Injectable()
export class UpdatePurchaseOrderStatusUseCase {
  constructor(
    private readonly purchaseOrdersRepository: PurchaseOrdersRepository,
  ) {}

  async execute(
    id: string,
    status: PurchaseOrderStatus,
  ): Promise<IPurchaseOrder> {
    const order = await this.purchaseOrdersRepository.findById(id);
    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }
    return this.purchaseOrdersRepository.updateStatus(id, status);
  }
}
