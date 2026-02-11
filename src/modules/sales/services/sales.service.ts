import { Injectable } from '@nestjs/common';
import type {
  CreateSaleData,
  CreateSaleItemData,
  ISale,
} from '../interfaces/sale.interface';
import { SaleStatus } from '../enums/sale-status.enum';
import { CreateSaleUseCase } from '../use-cases/create-sale.use-case';
import { FindSaleByIdUseCase } from '../use-cases/find-sale-by-id.use-case';
import { UpdateSaleStatusUseCase } from '../use-cases/update-sale-status.use-case';

@Injectable()
export class SalesService {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly findSaleByIdUseCase: FindSaleByIdUseCase,
    private readonly updateSaleStatusUseCase: UpdateSaleStatusUseCase,
  ) {}

  async create(
    data: CreateSaleData,
    items: CreateSaleItemData[],
  ): Promise<ISale> {
    return this.createSaleUseCase.executeWithData(data, items);
  }

  async findById(id: string, withItems = true): Promise<ISale> {
    return this.findSaleByIdUseCase.execute(id, withItems);
  }

  async updateStatus(id: string, status: SaleStatus): Promise<ISale> {
    return this.updateSaleStatusUseCase.execute(id, status);
  }
}
