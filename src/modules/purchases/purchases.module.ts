import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from 'src/modules/inventory/inventory.module';
import { PurchaseOrdersModule } from 'src/modules/purchase-orders/purchase-orders.module';
import { PurchasesController } from './controllers/purchases.controller';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from './entities/purchase-item.entity';
import { PurchasesRepository } from './repositories/purchases.repository';
import { CreatePurchaseUseCase } from './use-cases/create-purchase.use-case';
import { FindAllPurchasesUseCase } from './use-cases/find-all-purchases.use-case';
import { FindPurchaseByIdUseCase } from './use-cases/find-purchase-by-id.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseItem]),
    PurchaseOrdersModule,
    InventoryModule,
  ],
  controllers: [PurchasesController],
  providers: [
    PurchasesRepository,
    CreatePurchaseUseCase,
    FindAllPurchasesUseCase,
    FindPurchaseByIdUseCase,
  ],
})
export class PurchasesModule {}
