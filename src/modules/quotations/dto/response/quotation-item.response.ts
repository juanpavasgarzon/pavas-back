import type { IQuotationItem } from '../../interfaces/quotation.interface';

export class QuotationItemResponse {
  id: string;
  productId: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: Date;

  constructor(item: IQuotationItem) {
    this.id = item.id;
    this.productId = item.productId;
    this.description = item.description;
    this.quantity = Number(item.quantity);
    this.unitPrice = Number(item.unitPrice);
    this.total = Number(item.total);
    this.createdAt = item.createdAt;
  }
}
