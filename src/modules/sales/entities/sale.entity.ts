import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Quotation } from 'src/modules/quotations/entities/quotation.entity';
import type { ISale } from '../interfaces/sale.interface';
import { SaleStatus } from '../enums/sale-status.enum';
import { SaleType } from '../enums/sale-type.enum';
import { SaleItem } from './sale-item.entity';

@Entity('sales')
export class Sale implements ISale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: string;

  @Column({
    type: 'enum',
    enum: SaleType,
    default: SaleType.RETAIL,
  })
  type: SaleType;

  @Column({ name: 'quotation_id', nullable: true })
  quotationId: string | null;

  @ManyToOne(() => Quotation, { nullable: true })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Quotation | null;

  @Column({ name: 'client_id', nullable: true })
  clientId: string | null;

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: Client | null;

  @Column({ name: 'client_name', type: 'varchar', nullable: true })
  clientName: string | null;

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.DRAFT,
  })
  status: SaleStatus;

  @Column({ name: 'sale_date', type: 'date', nullable: true })
  saleDate: Date | null;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  subtotal: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by_id' })
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];
}
