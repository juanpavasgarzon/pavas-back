import { Injectable, NotFoundException } from '@nestjs/common';
import type { IInvoice } from '../interfaces/invoice.interface';
import { InvoicesRepository } from '../repositories/invoices.repository';

@Injectable()
export class FindInvoiceByIdUseCase {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  async execute(id: string): Promise<IInvoice> {
    const invoice = await this.invoicesRepository.findById(id);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }
}
