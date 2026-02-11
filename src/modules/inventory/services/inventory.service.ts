import { Injectable } from '@nestjs/common';
import type {
  CreateInventoryMovementData,
  IInventoryMovement,
} from '../interfaces/inventory-movement.interface';
import { CreateMovementUseCase } from '../use-cases/create-movement.use-case';

@Injectable()
export class InventoryService {
  constructor(private readonly createMovementUseCase: CreateMovementUseCase) {}

  async createMovement(
    data: CreateInventoryMovementData,
    createdById: string | null,
  ): Promise<IInventoryMovement> {
    return this.createMovementUseCase.execute(data, createdById);
  }
}
