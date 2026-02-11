import type { ItemType } from 'src/common/enums/item-type.enum';
import type { SaleStatus } from '../enums/sale-status.enum';
import type { SaleType } from '../enums/sale-type.enum';

export interface ISaleItem {
  id: string;
  saleId: string;
  itemType: ItemType | null;
  itemId: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: Date;
}

export interface ISale {
  id: string;
  number: string;
  type: SaleType;
  quotationId: string | null;
  clientId: string | null;
  clientName: string | null;
  status: SaleStatus;
  saleDate: Date | null;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  items?: ISaleItem[];
}

export interface CreateSaleData {
  type: SaleType;
  quotationId?: string | null;
  clientId?: string | null;
  clientName?: string | null;
  status: SaleStatus;
  saleDate?: Date | null;
  createdById: string;
}

export interface CreateSaleItemData {
  itemType?: ItemType | null;
  itemId?: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
}
