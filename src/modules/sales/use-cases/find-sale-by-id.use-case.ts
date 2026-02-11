import { Injectable, NotFoundException } from '@nestjs/common';
import type { ISale } from '../interfaces/sale.interface';
import { SalesRepository } from '../repositories/sales.repository';

@Injectable()
export class FindSaleByIdUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(id: string, withItems = true): Promise<ISale> {
    const sale = await this.salesRepository.findById(id, withItems);
    if (!sale) {
      throw new NotFoundException('Sale not found');
    }
    return sale;
  }
}
