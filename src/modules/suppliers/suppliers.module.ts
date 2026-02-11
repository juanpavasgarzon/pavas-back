import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersController } from './controllers/suppliers.controller';
import { Supplier } from './entities/supplier.entity';
import { SuppliersRepository } from './repositories/suppliers.repository';
import { SuppliersService } from './services/suppliers.service';
import { CreateSupplierUseCase } from './use-cases/create-supplier.use-case';
import { DeleteSupplierUseCase } from './use-cases/delete-supplier.use-case';
import { FindAllSuppliersUseCase } from './use-cases/find-all-suppliers.use-case';
import { FindSupplierByIdUseCase } from './use-cases/find-supplier-by-id.use-case';
import { UpdateSupplierUseCase } from './use-cases/update-supplier.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [
    SuppliersRepository,
    CreateSupplierUseCase,
    FindAllSuppliersUseCase,
    FindSupplierByIdUseCase,
    UpdateSupplierUseCase,
    DeleteSupplierUseCase,
    SuppliersService,
  ],
  exports: [SuppliersService],
})
export class SuppliersModule {}
