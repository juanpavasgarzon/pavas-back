import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import type { SalesByPeriodResult } from '../interfaces/report.interface';

@Injectable()
export class SalesByPeriodUseCase {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(from: Date, to: Date): Promise<SalesByPeriodResult> {
    const qb = this.saleRepository
      .createQueryBuilder('sale')
      .where('sale.createdAt >= :from', { from })
      .andWhere('sale.createdAt <= :to', { to })
      .andWhere('sale.status = :status', { status: 'confirmed' });

    const [sales, count] = await qb.getManyAndCount();
    const totalSales = sales.reduce((sum, s) => sum + Number(s.subtotal), 0);

    return {
      totalSales,
      count,
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
    };
  }
}
