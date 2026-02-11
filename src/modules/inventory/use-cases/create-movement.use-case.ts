import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/catalog/entities/product.entity';
import type {
  CreateInventoryMovementData,
  IInventoryMovement,
} from '../interfaces/inventory-movement.interface';
import { MovementType } from '../enums/movement-type.enum';
import { InventoryRepository } from '../repositories/inventory.repository';

@Injectable()
export class CreateMovementUseCase {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(
    data: CreateInventoryMovementData,
    createdById: string | null,
  ): Promise<IInventoryMovement> {
    const product = await this.productRepository.findOne({
      where: { id: data.productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!product.managesInventory) {
      throw new NotFoundException('Product does not manage inventory');
    }

    const movement = await this.inventoryRepository.create({
      ...data,
      movementDate: data.movementDate
        ? new Date(data.movementDate)
        : new Date(),
      createdById: createdById ?? null,
    });

    const qty = Number(data.quantity);
    const current = Number(product.currentStock);
    let newStock = Math.max(0, current - qty);
    if (data.type === MovementType.IN) {
      newStock = current + qty;
    }
    await this.productRepository.update(data.productId, {
      currentStock: newStock,
    });

    return movement;
  }
}
