import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/catalog/entities/product.entity';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryMovement } from './entities/inventory-movement.entity';
import { InventoryRepository } from './repositories/inventory.repository';
import { InventoryService } from './services/inventory.service';
import { CreateMovementUseCase } from './use-cases/create-movement.use-case';
import { FindAllMovementsUseCase } from './use-cases/find-all-movements.use-case';
import { FindMovementByIdUseCase } from './use-cases/find-movement-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryMovement, Product])],
  controllers: [InventoryController],
  providers: [
    InventoryRepository,
    CreateMovementUseCase,
    FindAllMovementsUseCase,
    FindMovementByIdUseCase,
    InventoryService,
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
