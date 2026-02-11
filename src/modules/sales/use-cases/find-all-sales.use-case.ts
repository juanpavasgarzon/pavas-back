import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { ISale } from '../interfaces/sale.interface';
import { SalesRepository } from '../repositories/sales.repository';
import { SalesQueryRequest } from '../dto/request/sales-query.request';

@Injectable()
export class FindAllSalesUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(query: SalesQueryRequest): Promise<PaginationResponse<ISale>> {
    const qb = this.salesRepository.createQueryBuilder('sale');

    if (query.status) {
      qb.andWhere('sale.status = :status', { status: query.status });
    }

    if (query.type) {
      qb.andWhere('sale.type = :type', { type: query.type });
    }

    if (query.clientName) {
      qb.andWhere('sale.clientName ILIKE :clientName', {
        clientName: `%${query.clientName}%`,
      });
    }

    return paginate(qb, query, {
      alias: 'sale',
      searchFields: ['number', 'clientName'],
    });
  }
}
