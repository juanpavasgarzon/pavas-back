import { Injectable } from '@nestjs/common';
import type { ISale } from '../interfaces/sale.interface';
import { SaleStatus } from '../enums/sale-status.enum';
import { SalesRepository } from '../repositories/sales.repository';

@Injectable()
export class UpdateSaleStatusUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(id: string, status: SaleStatus): Promise<ISale> {
    return this.salesRepository.updateStatus(id, status);
  }
}
