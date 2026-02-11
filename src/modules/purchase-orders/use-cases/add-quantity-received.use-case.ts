import { Injectable } from '@nestjs/common';
import { PurchaseOrdersRepository } from '../repositories/purchase-orders.repository';

@Injectable()
export class AddQuantityReceivedUseCase {
  constructor(
    private readonly purchaseOrdersRepository: PurchaseOrdersRepository,
  ) {}

  async execute(itemId: string, quantityToAdd: number): Promise<void> {
    return this.purchaseOrdersRepository.addQuantityReceived(
      itemId,
      quantityToAdd,
    );
  }
}
