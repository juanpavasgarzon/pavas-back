import type { IQuotation } from '../../interfaces/quotation.interface';
import { QuotationItemResponse } from './quotation-item.response';

export class QuotationResponse {
  id: string;
  number: string;
  clientName: string;
  status: string;
  validUntil: string | null;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  items?: QuotationItemResponse[];

  constructor(quotation: IQuotation) {
    this.id = quotation.id;
    this.number = quotation.number;
    this.clientName = quotation.clientName;
    this.status = quotation.status;
    this.validUntil = quotation.validUntil
      ? quotation.validUntil.toISOString().split('T')[0]
      : null;
    this.subtotal = Number(quotation.subtotal);
    this.createdAt = quotation.createdAt;
    this.updatedAt = quotation.updatedAt;
    this.createdById = quotation.createdById;
    if (quotation.items?.length) {
      this.items = quotation.items.map((i) => new QuotationItemResponse(i));
    }
  }
}
