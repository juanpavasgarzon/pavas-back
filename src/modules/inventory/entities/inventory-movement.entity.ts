import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/modules/catalog/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { MovementType } from '../enums/movement-type.enum';
import { InventoryReferenceType } from '../enums/reference-type.enum';
import type { IInventoryMovement } from '../interfaces/inventory-movement.interface';

@Entity('inventory_movements')
export class InventoryMovement implements IInventoryMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  type: MovementType;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 4,
  })
  quantity: number;

  @Column({ name: 'reference_type', type: 'varchar', nullable: true })
  referenceType: InventoryReferenceType | null;

  @Column({ name: 'reference_id', type: 'uuid', nullable: true })
  referenceId: string | null;

  @Column({ name: 'movement_date', type: 'date' })
  movementDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'created_by_id', nullable: true })
  createdById: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | null;
}
