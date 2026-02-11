import type { IPurchase } from '../../interfaces/purchase.interface';
import { PurchaseItemResponse } from './purchase-item.response';

export class PurchaseResponse {
  id: string;
  number: string;
  purchaseOrderId: string;
  receiptDate: string;
  subtotal: number;
  createdAt: Date;
  createdById: string;
  items?: PurchaseItemResponse[];

  constructor(purchase: IPurchase) {
    this.id = purchase.id;
    this.number = purchase.number;
    this.purchaseOrderId = purchase.purchaseOrderId;
    this.receiptDate = purchase.receiptDate.toISOString().split('T')[0];
    this.subtotal = Number(purchase.subtotal);
    this.createdAt = purchase.createdAt;
    this.createdById = purchase.createdById;
    if (purchase.items?.length) {
      this.items = purchase.items.map((i) => new PurchaseItemResponse(i));
    }
  }
}
