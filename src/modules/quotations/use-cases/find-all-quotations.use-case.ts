import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import { QuotationsQueryRequest } from '../dto/request/quotations-query.request';
import type { IQuotation } from '../interfaces/quotation.interface';
import { QuotationsRepository } from '../repositories/quotations.repository';

@Injectable()
export class FindAllQuotationsUseCase {
  constructor(private readonly quotationsRepository: QuotationsRepository) {}

  async execute(
    query: QuotationsQueryRequest,
  ): Promise<PaginationResponse<IQuotation>> {
    const qb = this.quotationsRepository.createQueryBuilder('quotation');

    return paginate(qb, query, {
      alias: 'quotation',
      searchFields: ['number', 'clientName'],
    });
  }
}
