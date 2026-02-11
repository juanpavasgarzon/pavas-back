import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from 'src/modules/catalog/catalog.module';
import { InventoryModule } from 'src/modules/inventory/inventory.module';
import { SalesController } from './controllers/sales.controller';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { SalesRepository } from './repositories/sales.repository';
import { SalesService } from './services/sales.service';
import { ConfirmSaleUseCase } from './use-cases/confirm-sale.use-case';
import { CreateSaleUseCase } from './use-cases/create-sale.use-case';
import { FindAllSalesUseCase } from './use-cases/find-all-sales.use-case';
import { FindSaleByIdUseCase } from './use-cases/find-sale-by-id.use-case';
import { UpdateSaleStatusUseCase } from './use-cases/update-sale-status.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem]),
    CatalogModule,
    InventoryModule,
  ],
  controllers: [SalesController],
  providers: [
    SalesRepository,
    CreateSaleUseCase,
    FindAllSalesUseCase,
    FindSaleByIdUseCase,
    UpdateSaleStatusUseCase,
    ConfirmSaleUseCase,
    SalesService,
  ],
  exports: [SalesService],
})
export class SalesModule {}
