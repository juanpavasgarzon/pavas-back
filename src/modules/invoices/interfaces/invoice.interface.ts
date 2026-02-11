import type { InvoiceStatus } from '../enums/invoice-status.enum';

export interface IInvoice {
  id: string;
  number: string;
  clientId: string;
  saleId: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date | null;
  createdAt: Date;
  createdById: string;
}

export interface CreateInvoiceData {
  clientId: string;
  saleId: string;
  subtotal: number;
  taxAmount?: number;
  total: number;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate?: Date | null;
  createdById: string;
}
