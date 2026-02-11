import type { ISale } from '../../interfaces/sale.interface';
import { SaleItemResponse } from './sale-item.response';

export class SaleResponse {
  id: string;
  number: string;
  type: string;
  quotationId: string | null;
  clientId: string | null;
  clientName: string | null;
  status: string;
  saleDate: string | null;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  items?: SaleItemResponse[];

  constructor(sale: ISale) {
    this.id = sale.id;
    this.number = sale.number;
    this.type = sale.type;
    this.quotationId = sale.quotationId;
    this.clientId = sale.clientId;
    this.clientName = sale.clientName;
    this.status = sale.status;
    this.saleDate = sale.saleDate
      ? sale.saleDate.toISOString().split('T')[0]
      : null;
    this.subtotal = Number(sale.subtotal);
    this.createdAt = sale.createdAt;
    this.updatedAt = sale.updatedAt;
    this.createdById = sale.createdById;
    if (sale.items?.length) {
      this.items = sale.items.map((i) => new SaleItemResponse(i));
    }
  }
}
