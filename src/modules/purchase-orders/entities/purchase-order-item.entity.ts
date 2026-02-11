import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemType } from 'src/common/enums/item-type.enum';
import { PurchaseOrder } from './purchase-order.entity';
import type { IPurchaseOrderItem } from '../interfaces/purchase-order.interface';

@Entity('purchase_order_items')
export class PurchaseOrderItem implements IPurchaseOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'purchase_order_id' })
  purchaseOrderId: string;

  @ManyToOne(() => PurchaseOrder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: PurchaseOrder;

  @Column({ name: 'item_type', type: 'enum', enum: ItemType })
  itemType: ItemType;

  @Column({ name: 'item_id' })
  itemId: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 4,
  })
  quantity: number;

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

  @Column({
    name: 'quantity_received',
    type: 'decimal',
    precision: 15,
    scale: 4,
    default: 0,
  })
  quantityReceived: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
