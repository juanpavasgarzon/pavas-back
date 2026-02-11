import type { ItemType } from 'src/common/enums/item-type.enum';
import type { PurchaseOrderStatus } from '../enums/purchase-order-status.enum';

export interface IPurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  itemType: ItemType;
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  quantityReceived: number;
  createdAt: Date;
}

export interface IPurchaseOrder {
  id: string;
  number: string;
  supplierId: string | null;
  status: PurchaseOrderStatus;
  expectedDate: Date | null;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  items?: IPurchaseOrderItem[];
}

export interface CreatePurchaseOrderData {
  supplierId?: string | null;
  status?: PurchaseOrderStatus;
  expectedDate?: Date | null;
  createdById: string;
}

export interface CreatePurchaseOrderItemData {
  itemType: ItemType;
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
}
