import { Injectable } from '@nestjs/common';
import { PaginationResponse } from 'src/common';
import type {
  CreateSupplierData,
  ISupplier,
  UpdateSupplierData,
} from '../interfaces/supplier.interface';
import type { SuppliersQueryRequest } from '../dto/request/suppliers-query.request';
import { CreateSupplierUseCase } from '../use-cases/create-supplier.use-case';
import { DeleteSupplierUseCase } from '../use-cases/delete-supplier.use-case';
import { FindAllSuppliersUseCase } from '../use-cases/find-all-suppliers.use-case';
import { FindSupplierByIdUseCase } from '../use-cases/find-supplier-by-id.use-case';
import { UpdateSupplierUseCase } from '../use-cases/update-supplier.use-case';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly findAllSuppliersUseCase: FindAllSuppliersUseCase,
    private readonly findSupplierByIdUseCase: FindSupplierByIdUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly deleteSupplierUseCase: DeleteSupplierUseCase,
  ) {}

  async create(data: CreateSupplierData): Promise<ISupplier> {
    return this.createSupplierUseCase.execute(data);
  }

  async findAll(
    query: SuppliersQueryRequest,
  ): Promise<PaginationResponse<ISupplier>> {
    return this.findAllSuppliersUseCase.execute(query);
  }

  async findById(id: string): Promise<ISupplier> {
    return this.findSupplierByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateSupplierData): Promise<ISupplier> {
    return this.updateSupplierUseCase.execute(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.deleteSupplierUseCase.execute(id);
  }
}
