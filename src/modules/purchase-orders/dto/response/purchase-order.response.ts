import type { IPurchaseOrder } from '../../interfaces/purchase-order.interface';
import { PurchaseOrderItemResponse } from './purchase-order-item.response';

export class PurchaseOrderResponse {
  id: string;
  number: string;
  supplierId: string | null;
  status: string;
  expectedDate: string | null;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  items?: PurchaseOrderItemResponse[];

  constructor(order: IPurchaseOrder) {
    this.id = order.id;
    this.number = order.number;
    this.supplierId = order.supplierId;
    this.status = order.status;
    this.expectedDate = order.expectedDate
      ? order.expectedDate.toISOString().split('T')[0]
      : null;
    this.subtotal = Number(order.subtotal);
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.createdById = order.createdById;
    if (order.items?.length) {
      this.items = order.items.map((i) => new PurchaseOrderItemResponse(i));
    }
  }
}
