import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import type { TopProductItem } from '../interfaces/report.interface';

@Injectable()
export class TopProductsUseCase {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(from: Date, to: Date, limit = 10): Promise<TopProductItem[]> {
    const raw = await this.saleRepository
      .createQueryBuilder('sale')
      .innerJoin('sale.items', 'item')
      .select('item.item_id', 'productId')
      .addSelect('item.description', 'description')
      .addSelect('SUM(item.quantity)', 'totalQuantity')
      .addSelect('SUM(item.total)', 'totalAmount')
      .where('sale.createdAt >= :from', { from })
      .andWhere('sale.createdAt <= :to', { to })
      .andWhere('sale.status = :status', { status: 'confirmed' })
      .andWhere('item.item_type = :itemType', { itemType: 'product' })
      .andWhere('item.item_id IS NOT NULL')
      .groupBy('item.item_id')
      .addGroupBy('item.description')
      .orderBy('totalAmount', 'DESC')
      .limit(limit)
      .getRawMany();

    return raw.map((r: Record<string, string>) => ({
      productId: r.productId,
      description: r.description,
      totalQuantity: Number(r.totalQuantity),
      totalAmount: Number(r.totalAmount),
    }));
  }
}
