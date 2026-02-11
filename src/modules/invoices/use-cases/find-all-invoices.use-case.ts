import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { IInvoice } from '../interfaces/invoice.interface';
import { InvoicesRepository } from '../repositories/invoices.repository';
import type { InvoicesQueryRequest } from '../dto/request/invoices-query.request';

@Injectable()
export class FindAllInvoicesUseCase {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  async execute(
    query: InvoicesQueryRequest,
  ): Promise<PaginationResponse<IInvoice>> {
    const qb = this.invoicesRepository.createQueryBuilder('invoice');
    if (query.clientId) {
      qb.andWhere('invoice.clientId = :clientId', {
        clientId: query.clientId,
      });
    }
    if (query.saleId) {
      qb.andWhere('invoice.saleId = :saleId', { saleId: query.saleId });
    }
    if (query.status) {
      qb.andWhere('invoice.status = :status', { status: query.status });
    }
    return paginate(qb, query, {
      alias: 'invoice',
      searchFields: ['number'],
    });
  }
}
