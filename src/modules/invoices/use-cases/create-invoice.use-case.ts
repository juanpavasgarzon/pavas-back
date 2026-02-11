import { Injectable } from '@nestjs/common';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import type { IInvoice } from '../interfaces/invoice.interface';
import { InvoicesRepository } from '../repositories/invoices.repository';
import { SalesService } from 'src/modules/sales/services/sales.service';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import type { CreateInvoiceRequest } from '../dto/request/create-invoice.request';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly salesService: SalesService,
    private readonly clientsService: ClientsService,
  ) {}

  async execute(
    request: CreateInvoiceRequest,
    createdById: string,
  ): Promise<IInvoice> {
    await this.salesService.findById(request.saleId);
    await this.clientsService.findById(request.clientId);

    const issueDate = new Date(request.issueDate);
    const dueDate = request.dueDate ? new Date(request.dueDate) : null;
    const taxAmount = request.taxAmount ?? 0;

    return this.invoicesRepository.create({
      clientId: request.clientId,
      saleId: request.saleId,
      subtotal: request.subtotal,
      taxAmount,
      total: request.total,
      status: request.status ?? InvoiceStatus.DRAFT,
      issueDate,
      dueDate,
      createdById,
    });
  }
}
