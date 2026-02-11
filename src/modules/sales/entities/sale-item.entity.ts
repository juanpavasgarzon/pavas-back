import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemType } from 'src/common/enums/item-type.enum';
import type { ISaleItem } from '../interfaces/sale.interface';
import { Sale } from './sale.entity';

@Entity('sale_items')
export class SaleItem implements ISaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sale_id' })
  saleId: string;

  @ManyToOne(() => Sale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @Column({ name: 'item_type', type: 'enum', enum: ItemType, nullable: true })
  itemType: ItemType | null;

  @Column({ name: 'item_id', type: 'uuid', nullable: true })
  itemId: string | null;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
