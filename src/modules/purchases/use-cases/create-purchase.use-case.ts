import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemType } from 'src/common/enums/item-type.enum';
import { MovementType } from 'src/modules/inventory/enums/movement-type.enum';
import { InventoryReferenceType } from 'src/modules/inventory/enums/reference-type.enum';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';
import { PurchaseOrdersService } from 'src/modules/purchase-orders/services/purchase-orders.service';
import type {
  CreatePurchaseItemData,
  IPurchase,
} from '../interfaces/purchase.interface';
import { PurchasesRepository } from '../repositories/purchases.repository';
import type { CreatePurchaseRequest } from '../dto/request/create-purchase.request';

@Injectable()
export class CreatePurchaseUseCase {
  constructor(
    private readonly purchasesRepository: PurchasesRepository,
    private readonly purchaseOrdersService: PurchaseOrdersService,
    private readonly inventoryService: InventoryService,
  ) {}

  async execute(
    request: CreatePurchaseRequest,
    createdById: string,
  ): Promise<IPurchase> {
    if (!request.items?.length) {
      throw new BadRequestException('Purchase must have at least one item');
    }
    const order = await this.purchaseOrdersService.findById(
      request.purchaseOrderId,
      true,
    );
    if (!order) {
      throw new BadRequestException('Purchase order not found');
    }

    const orderItemsMap = new Map((order.items ?? []).map((i) => [i.id, i]));
    const receiptDate = new Date(request.receiptDate);
    const items: CreatePurchaseItemData[] = request.items.map((item) => {
      const poItem = orderItemsMap.get(item.purchaseOrderItemId);
      if (!poItem) {
        throw new BadRequestException(
          `Item ${item.purchaseOrderItemId} does not belong to this purchase order`,
        );
      }
      return {
        purchaseOrderItemId: item.purchaseOrderItemId,
        itemType: poItem.itemType,
        itemId: poItem.itemId,
        description: item.description,
        quantityReceived: item.quantityReceived,
        unitPrice: item.unitPrice,
      };
    });

    const purchase = await this.purchasesRepository.create(
      {
        purchaseOrderId: request.purchaseOrderId,
        receiptDate,
        createdById,
      },
      items,
    );

    for (const item of request.items) {
      const poItem = orderItemsMap.get(item.purchaseOrderItemId)!;
      if (poItem.itemType === ItemType.PRODUCT) {
        await this.inventoryService.createMovement(
          {
            productId: poItem.itemId,
            type: MovementType.IN,
            quantity: item.quantityReceived,
            referenceType: InventoryReferenceType.PURCHASE,
            referenceId: purchase.id,
            movementDate: receiptDate,
            notes: `Recepción compra ${purchase.number}`,
          },
          createdById,
        );
      }
      await this.purchaseOrdersService.addQuantityReceived(
        item.purchaseOrderItemId,
        item.quantityReceived,
      );
    }

    return this.purchasesRepository.findById(
      purchase.id,
      true,
    ) as Promise<IPurchase>;
  }
}
