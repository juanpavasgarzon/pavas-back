import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CreatePurchaseOrderItemData,
  IPurchaseOrder,
} from '../interfaces/purchase-order.interface';
import { PurchaseOrderStatus } from '../enums/purchase-order-status.enum';
import { PurchaseOrdersRepository } from '../repositories/purchase-orders.repository';
import type { CreatePurchaseOrderRequest } from '../dto/request/create-purchase-order.request';

@Injectable()
export class CreatePurchaseOrderUseCase {
  constructor(
    private readonly purchaseOrdersRepository: PurchaseOrdersRepository,
  ) {}

  async execute(
    request: CreatePurchaseOrderRequest,
    createdById: string,
  ): Promise<IPurchaseOrder> {
    if (!request.items?.length) {
      throw new BadRequestException(
        'Purchase order must have at least one item',
      );
    }
    const items: CreatePurchaseOrderItemData[] = request.items.map((item) => ({
      itemType: item.itemType,
      itemId: item.itemId,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    const data = {
      supplierId: request.supplierId ?? null,
      status: request.status ?? PurchaseOrderStatus.DRAFT,
      expectedDate: request.expectedDate
        ? new Date(request.expectedDate)
        : null,
      createdById,
    };
    return this.purchaseOrdersRepository.create(data, items);
  }
}
