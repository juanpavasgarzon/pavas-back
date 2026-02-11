import type { IPurchaseItem } from '../../interfaces/purchase.interface';

export class PurchaseItemResponse {
  id: string;
  purchaseOrderItemId: string;
  itemType: string;
  itemId: string;
  description: string;
  quantityReceived: number;
  unitPrice: number;
  total: number;
  createdAt: Date;

  constructor(item: IPurchaseItem) {
    this.id = item.id;
    this.purchaseOrderItemId = item.purchaseOrderItemId;
    this.itemType = item.itemType;
    this.itemId = item.itemId;
    this.description = item.description;
    this.quantityReceived = Number(item.quantityReceived);
    this.unitPrice = Number(item.unitPrice);
    this.total = Number(item.total);
    this.createdAt = item.createdAt;
  }
}
