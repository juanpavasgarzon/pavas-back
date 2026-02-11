import type { ItemType } from 'src/common/enums/item-type.enum';

export interface IPurchaseItem {
  id: string;
  purchaseId: string;
  purchaseOrderItemId: string;
  itemType: ItemType;
  itemId: string;
  description: string;
  quantityReceived: number;
  unitPrice: number;
  total: number;
  createdAt: Date;
}

export interface IPurchase {
  id: string;
  number: string;
  purchaseOrderId: string;
  receiptDate: Date;
  subtotal: number;
  createdAt: Date;
  createdById: string;
  items?: IPurchaseItem[];
}

export interface CreatePurchaseItemData {
  purchaseOrderItemId: string;
  itemType: ItemType;
  itemId: string;
  description: string;
  quantityReceived: number;
  unitPrice: number;
}

export interface CreatePurchaseData {
  purchaseOrderId: string;
  receiptDate: Date;
  createdById: string;
}
