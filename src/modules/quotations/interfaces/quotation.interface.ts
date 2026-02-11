import type { ItemType } from 'src/common/enums/item-type.enum';
import type { QuotationStatus } from '../enums/quotation-status.enum';

export interface IQuotationItem {
  id: string;
  quotationId: string;
  itemType: ItemType | null;
  itemId: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: Date;
}

export interface IQuotation {
  id: string;
  number: string;
  clientName: string;
  status: QuotationStatus;
  validUntil: Date | null;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  items?: IQuotationItem[];
}

export interface CreateQuotationData {
  clientName: string;
  status: QuotationStatus;
  validUntil?: Date | null;
  createdById: string;
}

export interface CreateQuotationItemData {
  itemType?: ItemType | null;
  itemId?: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
}
