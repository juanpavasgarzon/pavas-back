import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemType } from 'src/common/enums/item-type.enum';
import { PurchaseOrderItem } from 'src/modules/purchase-orders/entities/purchase-order-item.entity';
import { Purchase } from './purchase.entity';
import type { IPurchaseItem } from '../interfaces/purchase.interface';

@Entity('purchase_items')
export class PurchaseItem implements IPurchaseItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'purchase_id' })
  purchaseId: string;

  @ManyToOne(() => Purchase, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @Column({ name: 'purchase_order_item_id' })
  purchaseOrderItemId: string;

  @ManyToOne(() => PurchaseOrderItem)
  @JoinColumn({ name: 'purchase_order_item_id' })
  purchaseOrderItem: PurchaseOrderItem;

  @Column({ name: 'item_type', type: 'enum', enum: ItemType })
  itemType: ItemType;

  @Column({ name: 'item_id' })
  itemId: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'quantity_received',
    type: 'decimal',
    precision: 15,
    scale: 4,
  })
  quantityReceived: number;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  unitPrice: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
