import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PurchaseOrderItem } from '../entities/purchase-order-item.entity';
import type {
  CreatePurchaseOrderData,
  CreatePurchaseOrderItemData,
  IPurchaseOrder,
} from '../interfaces/purchase-order.interface';
import { PurchaseOrderStatus } from '../enums/purchase-order-status.enum';

@Injectable()
export class PurchaseOrdersRepository {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly repository: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderItem)
    private readonly itemsRepository: Repository<PurchaseOrderItem>,
  ) {}

  createQueryBuilder(
    alias: string = 'purchase_order',
  ): SelectQueryBuilder<PurchaseOrder> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(
    id: string,
    withItems = false,
  ): Promise<IPurchaseOrder | null> {
    const qb = this.repository
      .createQueryBuilder('purchase_order')
      .where('purchase_order.id = :id', { id });
    if (withItems) {
      qb.leftJoinAndSelect('purchase_order.items', 'items');
    }
    return qb.getOne();
  }

  async create(
    data: CreatePurchaseOrderData,
    items: CreatePurchaseOrderItemData[],
  ): Promise<IPurchaseOrder> {
    const number = await this.getNextNumber();
    const order = this.repository.create({
      ...data,
      number,
      status: data.status ?? PurchaseOrderStatus.DRAFT,
    });
    const saved = await this.repository.save(order);
    const itemEntities = items.map((item) =>
      this.itemsRepository.create({
        purchaseOrderId: saved.id,
        itemType: item.itemType,
        itemId: item.itemId,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      }),
    );
    await this.itemsRepository.save(itemEntities);
    const subtotal = itemEntities.reduce((sum, e) => sum + Number(e.total), 0);
    await this.repository.update(saved.id, { subtotal });
    return this.findById(saved.id, true) as Promise<IPurchaseOrder>;
  }

  async updateStatus(
    id: string,
    status: PurchaseOrderStatus,
  ): Promise<IPurchaseOrder> {
    await this.repository.update(id, { status });
    return this.findById(id, true) as Promise<IPurchaseOrder>;
  }

  async updateItemQuantityReceived(
    itemId: string,
    quantityReceived: number,
  ): Promise<void> {
    await this.itemsRepository.update(itemId, { quantityReceived });
  }

  async addQuantityReceived(
    itemId: string,
    quantityToAdd: number,
  ): Promise<void> {
    const item = await this.itemsRepository.findOne({ where: { id: itemId } });
    if (!item) {
      return;
    }
    const newReceived = Number(item.quantityReceived) + Number(quantityToAdd);
    await this.itemsRepository.update(itemId, {
      quantityReceived: newReceived,
    });
  }

  async getNextNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `OC-${year}-`;
    const last = await this.repository
      .createQueryBuilder('po')
      .where('po.number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('po.number', 'DESC')
      .getOne();
    if (!last) {
      return `${prefix}0001`;
    }
    const lastNum = parseInt(last.number.replace(prefix, ''), 10) || 0;
    return `${prefix}${String(lastNum + 1).padStart(4, '0')}`;
  }
}
