import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrdersController } from './controllers/purchase-orders.controller';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';
import { PurchaseOrdersRepository } from './repositories/purchase-orders.repository';
import { PurchaseOrdersService } from './services/purchase-orders.service';
import { AddQuantityReceivedUseCase } from './use-cases/add-quantity-received.use-case';
import { CreatePurchaseOrderUseCase } from './use-cases/create-purchase-order.use-case';
import { FindAllPurchaseOrdersUseCase } from './use-cases/find-all-purchase-orders.use-case';
import { FindPurchaseOrderByIdUseCase } from './use-cases/find-purchase-order-by-id.use-case';
import { UpdatePurchaseOrderStatusUseCase } from './use-cases/update-purchase-order-status.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderItem])],
  controllers: [PurchaseOrdersController],
  providers: [
    PurchaseOrdersRepository,
    AddQuantityReceivedUseCase,
    CreatePurchaseOrderUseCase,
    FindAllPurchaseOrdersUseCase,
    FindPurchaseOrderByIdUseCase,
    UpdatePurchaseOrderStatusUseCase,
    PurchaseOrdersService,
  ],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
