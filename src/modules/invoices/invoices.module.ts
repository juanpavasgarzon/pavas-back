import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from 'src/modules/clients/clients.module';
import { SalesModule } from 'src/modules/sales/sales.module';
import { InvoicesController } from './controllers/invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { InvoicesRepository } from './repositories/invoices.repository';
import { CreateInvoiceUseCase } from './use-cases/create-invoice.use-case';
import { FindAllInvoicesUseCase } from './use-cases/find-all-invoices.use-case';
import { FindInvoiceByIdUseCase } from './use-cases/find-invoice-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), ClientsModule, SalesModule],
  controllers: [InvoicesController],
  providers: [
    InvoicesRepository,
    CreateInvoiceUseCase,
    FindAllInvoicesUseCase,
    FindInvoiceByIdUseCase,
  ],
})
export class InvoicesModule {}
