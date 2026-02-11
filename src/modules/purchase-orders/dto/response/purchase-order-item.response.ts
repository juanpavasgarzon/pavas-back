import type { IPurchaseOrderItem } from '../../interfaces/purchase-order.interface';

export class PurchaseOrderItemResponse {
  id: string;
  itemType: string;
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  quantityReceived: number;
  createdAt: Date;

  constructor(item: IPurchaseOrderItem) {
    this.id = item.id;
    this.itemType = item.itemType;
    this.itemId = item.itemId;
    this.description = item.description;
    this.quantity = Number(item.quantity);
    this.unitPrice = Number(item.unitPrice);
    this.total = Number(item.total);
    this.quantityReceived = Number(item.quantityReceived);
    this.createdAt = item.createdAt;
  }
}
