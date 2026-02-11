import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './common/guards';
import { ConfigModule } from './config';
import { ThrottlerConfigModule } from './config/throttler-config.module';
import { DatabaseModule } from './database';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ClientsModule } from './modules/clients/clients.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SalesModule } from './modules/sales/sales.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ThrottlerConfigModule,
    AuthModule,
    UsersModule,
    CatalogModule,
    ClientsModule,
    SuppliersModule,
    InventoryModule,
    InvoicesModule,
    PurchaseOrdersModule,
    PurchasesModule,
    QuotationsModule,
    ReportsModule,
    SalesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
