import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/catalog/entities/product.entity';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import { ReportsController } from './controllers/reports.controller';
import { SalesByPeriodUseCase } from './use-cases/sales-by-period.use-case';
import { LowStockProductsUseCase } from './use-cases/low-stock-products.use-case';
import { TopProductsUseCase } from './use-cases/top-products.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Product])],
  controllers: [ReportsController],
  providers: [
    SalesByPeriodUseCase,
    LowStockProductsUseCase,
    TopProductsUseCase,
  ],
})
export class ReportsModule {}
