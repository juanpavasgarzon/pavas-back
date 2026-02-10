import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Quotation } from '../entities/quotation.entity';
import type {
  CreateQuotationData,
  CreateQuotationItemData,
  IQuotation,
} from '../interfaces/quotation.interface';
import { QuotationItem } from '../entities/quotation-item.entity';

@Injectable()
export class QuotationsRepository {
  constructor(
    @InjectRepository(Quotation)
    private readonly repository: Repository<Quotation>,
    @InjectRepository(QuotationItem)
    private readonly itemsRepository: Repository<QuotationItem>,
  ) {}

  createQueryBuilder(
    alias: string = 'quotation',
  ): SelectQueryBuilder<Quotation> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: string, withItems = false): Promise<IQuotation | null> {
    const qb = this.repository
      .createQueryBuilder('quotation')
      .where('quotation.id = :id', { id });
    if (withItems) {
      qb.leftJoinAndSelect('quotation.items', 'items');
    }
    return qb.getOne();
  }

  async create(
    data: CreateQuotationData,
    items: CreateQuotationItemData[],
  ): Promise<IQuotation> {
    const number = await this.getNextNumber();
    const quotation = this.repository.create({ ...data, number });
    const saved = await this.repository.save(quotation);
    const itemEntities = items.map((item) =>
      this.itemsRepository.create({
        quotationId: saved.id,
        productId: item.productId ?? null,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      }),
    );
    await this.itemsRepository.save(itemEntities);
    const subtotal = itemEntities.reduce((sum, e) => sum + Number(e.total), 0);
    await this.repository.update(saved.id, { subtotal });
    return this.findById(saved.id, true) as Promise<IQuotation>;
  }

  async getNextNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `COT-${year}-`;
    const last = await this.repository
      .createQueryBuilder('q')
      .where('q.number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('q.number', 'DESC')
      .getOne();
    if (!last) {
      return `${prefix}0001`;
    }
    const lastNum = parseInt(last.number.replace(prefix, ''), 10) || 0;
    return `${prefix}${String(lastNum + 1).padStart(4, '0')}`;
  }
}
