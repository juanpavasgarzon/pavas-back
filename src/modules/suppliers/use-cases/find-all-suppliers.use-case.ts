import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { ISupplier } from '../interfaces/supplier.interface';
import { SuppliersRepository } from '../repositories/suppliers.repository';
import type { SuppliersQueryRequest } from '../dto/request/suppliers-query.request';

@Injectable()
export class FindAllSuppliersUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(
    query: SuppliersQueryRequest,
  ): Promise<PaginationResponse<ISupplier>> {
    const qb = this.suppliersRepository.createQueryBuilder('supplier');
    return paginate(qb, query, {
      alias: 'supplier',
      searchFields: ['code', 'name'],
    });
  }
}
