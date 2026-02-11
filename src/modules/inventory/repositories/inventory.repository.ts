import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InventoryMovement } from '../entities/inventory-movement.entity';
import type {
  CreateInventoryMovementData,
  IInventoryMovement,
} from '../interfaces/inventory-movement.interface';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(InventoryMovement)
    private readonly repository: Repository<InventoryMovement>,
  ) {}

  createQueryBuilder(
    alias: string = 'movement',
  ): SelectQueryBuilder<InventoryMovement> {
    return this.repository.createQueryBuilder(alias);
  }

  async create(data: CreateInventoryMovementData): Promise<IInventoryMovement> {
    const entity = this.repository.create({
      ...data,
      movementDate: data.movementDate ?? new Date(),
    });
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<IInventoryMovement | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['product'],
    });
  }
}
