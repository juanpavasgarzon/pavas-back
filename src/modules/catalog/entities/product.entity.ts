import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UnitMeasure } from '../enums/unit-measure.enum';
import type { IProduct } from '../interfaces/product.interface';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    name: 'unit_measure',
    type: 'enum',
    enum: UnitMeasure,
    default: UnitMeasure.UNIT,
  })
  unitMeasure: UnitMeasure;

  @Column({
    name: 'conversion_factor',
    type: 'decimal',
    precision: 10,
    scale: 4,
    default: 1,
  })
  conversionFactor: number;

  @Column({ name: 'manages_inventory', default: true })
  managesInventory: boolean;

  @Column({
    name: 'base_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  basePrice: number | null;

  @Column({
    name: 'current_stock',
    type: 'decimal',
    precision: 15,
    scale: 4,
    default: 0,
  })
  currentStock: number;

  @Column({
    name: 'minimum_stock',
    type: 'decimal',
    precision: 15,
    scale: 4,
    default: 0,
  })
  minimumStock: number;

  @Column({ type: 'varchar', nullable: true })
  location: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
