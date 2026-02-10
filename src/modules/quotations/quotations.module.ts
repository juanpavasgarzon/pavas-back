import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationsController } from './controllers/quotations.controller';
import { Quotation } from './entities/quotation.entity';
import { QuotationItem } from './entities/quotation-item.entity';
import { QuotationsRepository } from './repositories/quotations.repository';
import { CreateQuotationUseCase } from './use-cases/create-quotation.use-case';
import { FindAllQuotationsUseCase } from './use-cases/find-all-quotations.use-case';
import { FindQuotationByIdUseCase } from './use-cases/find-quotation-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, QuotationItem])],
  controllers: [QuotationsController],
  providers: [
    QuotationsRepository,
    CreateQuotationUseCase,
    FindAllQuotationsUseCase,
    FindQuotationByIdUseCase,
  ],
})
export class QuotationsModule {}
