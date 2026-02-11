import { Injectable, NotFoundException } from '@nestjs/common';
import type { IInventoryMovement } from '../interfaces/inventory-movement.interface';
import { InventoryRepository } from '../repositories/inventory.repository';

@Injectable()
export class FindMovementByIdUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(id: string): Promise<IInventoryMovement> {
    const movement = await this.inventoryRepository.findById(id);
    if (!movement) {
      throw new NotFoundException('Movement not found');
    }
    return movement;
  }
}
