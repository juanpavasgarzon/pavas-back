import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/modules/catalog/entities/product.entity';
import { Quotation } from './quotation.entity';
import type { IQuotationItem } from '../interfaces/quotation.interface';

@Entity('quotation_items')
export class QuotationItem implements IQuotationItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quotation_id' })
  quotationId: string;

  @ManyToOne(() => Quotation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Quotation;

  @Column({ name: 'product_id', nullable: true })
  productId: string | null;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

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
