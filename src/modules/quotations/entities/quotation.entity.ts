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
import { QuotationStatus } from '../enums/quotation-status.enum';
import type { IQuotation } from '../interfaces/quotation.interface';
import { QuotationItem } from './quotation-item.entity';

@Entity('quotations')
export class Quotation implements IQuotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: string;

  @Column({ name: 'client_name' })
  clientName: string;

  @Column({
    type: 'enum',
    enum: QuotationStatus,
    default: QuotationStatus.DRAFT,
  })
  status: QuotationStatus;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: Date | null;

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

  @OneToMany(() => QuotationItem, (item) => item.quotation, { cascade: true })
  items: QuotationItem[];
}
