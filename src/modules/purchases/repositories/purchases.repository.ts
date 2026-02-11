import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Purchase } from '../entities/purchase.entity';
import { PurchaseItem } from '../entities/purchase-item.entity';
import type {
  CreatePurchaseData,
  CreatePurchaseItemData,
  IPurchase,
} from '../interfaces/purchase.interface';

@Injectable()
export class PurchasesRepository {
  constructor(
    @InjectRepository(Purchase)
    private readonly repository: Repository<Purchase>,
    @InjectRepository(PurchaseItem)
    private readonly itemsRepository: Repository<PurchaseItem>,
  ) {}

  createQueryBuilder(alias: string = 'purchase'): SelectQueryBuilder<Purchase> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: string, withItems = false): Promise<IPurchase | null> {
    const qb = this.repository
      .createQueryBuilder('purchase')
      .where('purchase.id = :id', { id });
    if (withItems) {
      qb.leftJoinAndSelect('purchase.items', 'items');
    }
    return qb.getOne();
  }

  async create(
    data: CreatePurchaseData,
    items: CreatePurchaseItemData[],
  ): Promise<IPurchase> {
    const number = await this.getNextNumber();
    const purchase = this.repository.create({
      ...data,
      number,
    });
    const saved = await this.repository.save(purchase);
    const itemEntities = items.map((item) =>
      this.itemsRepository.create({
        purchaseId: saved.id,
        purchaseOrderItemId: item.purchaseOrderItemId,
        itemType: item.itemType,
        itemId: item.itemId,
        description: item.description,
        quantityReceived: item.quantityReceived,
        unitPrice: item.unitPrice,
        total: item.quantityReceived * item.unitPrice,
      }),
    );
    await this.itemsRepository.save(itemEntities);
    const subtotal = itemEntities.reduce((sum, e) => sum + Number(e.total), 0);
    await this.repository.update(saved.id, { subtotal });
    return this.findById(saved.id, true) as Promise<IPurchase>;
  }

  async getNextNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `COM-${year}-`;
    const last = await this.repository
      .createQueryBuilder('p')
      .where('p.number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('p.number', 'DESC')
      .getOne();
    if (!last) {
      return `${prefix}0001`;
    }
    const lastNum = parseInt(last.number.replace(prefix, ''), 10) || 0;
    return `${prefix}${String(lastNum + 1).padStart(4, '0')}`;
  }
}
