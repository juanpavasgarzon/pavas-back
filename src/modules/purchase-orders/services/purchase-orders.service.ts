import { Injectable } from '@nestjs/common';
import type { IPurchaseOrder } from '../interfaces/purchase-order.interface';
import { AddQuantityReceivedUseCase } from '../use-cases/add-quantity-received.use-case';
import { FindPurchaseOrderByIdUseCase } from '../use-cases/find-purchase-order-by-id.use-case';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    private readonly findPurchaseOrderByIdUseCase: FindPurchaseOrderByIdUseCase,
    private readonly addQuantityReceivedUseCase: AddQuantityReceivedUseCase,
  ) {}

  async findById(id: string): Promise<IPurchaseOrder> {
    return await this.findPurchaseOrderByIdUseCase.execute(id);
  }

  async addQuantityReceived(
    itemId: string,
    quantityToAdd: number,
  ): Promise<void> {
    return this.addQuantityReceivedUseCase.execute(itemId, quantityToAdd);
  }
}
