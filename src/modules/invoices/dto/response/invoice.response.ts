import type { IInvoice } from '../../interfaces/invoice.interface';

export class InvoiceResponse {
  id: string;
  number: string;
  clientId: string;
  saleId: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  status: string;
  issueDate: string;
  dueDate: string | null;
  createdAt: Date;
  createdById: string;

  constructor(invoice: IInvoice) {
    this.id = invoice.id;
    this.number = invoice.number;
    this.clientId = invoice.clientId;
    this.saleId = invoice.saleId;
    this.subtotal = Number(invoice.subtotal);
    this.taxAmount = Number(invoice.taxAmount);
    this.total = Number(invoice.total);
    this.status = invoice.status;
    this.issueDate = invoice.issueDate.toISOString().split('T')[0];
    this.dueDate = invoice.dueDate
      ? invoice.dueDate.toISOString().split('T')[0]
      : null;
    this.createdAt = invoice.createdAt;
    this.createdById = invoice.createdById;
  }
}
