import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { SaleItem } from '../entities/sale-item.entity';
import { SaleStatus } from '../enums/sale-status.enum';
import type {
  CreateSaleData,
  CreateSaleItemData,
  ISale,
} from '../interfaces/sale.interface';

@Injectable()
export class SalesRepository {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private readonly itemsRepository: Repository<SaleItem>,
  ) {}

  createQueryBuilder(alias: string = 'sale'): SelectQueryBuilder<Sale> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: string, withItems = false): Promise<ISale | null> {
    const qb = this.repository
      .createQueryBuilder('sale')
      .where('sale.id = :id', { id });

    if (withItems) {
      qb.leftJoinAndSelect('sale.items', 'items');
    }

    return qb.getOne();
  }

  async create(
    data: CreateSaleData,
    items: CreateSaleItemData[],
  ): Promise<ISale> {
    const number = await this.getNextNumber();
    const sale = this.repository.create({ ...data, number });
    const saved = await this.repository.save(sale);

    const itemEntities = items.map((item) =>
      this.itemsRepository.create({
        saleId: saved.id,
        itemType: item.itemType ?? null,
        itemId: item.itemId ?? null,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      }),
    );

    await this.itemsRepository.save(itemEntities);

    const subtotal = itemEntities.reduce((sum, e) => sum + Number(e.total), 0);
    await this.repository.update(saved.id, { subtotal });

    return this.findById(saved.id, true) as Promise<ISale>;
  }

  async updateStatus(id: string, status: SaleStatus): Promise<ISale> {
    await this.repository.update(id, { status });
    return this.findById(id, true) as Promise<ISale>;
  }

  async getNextNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `VTA-${year}-`;

    const last = await this.repository
      .createQueryBuilder('s')
      .where('s.number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('s.number', 'DESC')
      .getOne();

    if (!last) {
      return `${prefix}0001`;
    }

    const lastNum = parseInt(last.number.replace(prefix, ''), 10) || 0;
    return `${prefix}${String(lastNum + 1).padStart(4, '0')}`;
  }
}
