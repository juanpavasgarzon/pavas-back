import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CreateSaleData,
  CreateSaleItemData,
  ISale,
} from '../interfaces/sale.interface';
import { SaleStatus } from '../enums/sale-status.enum';
import { SalesRepository } from '../repositories/sales.repository';
import type { CreateSaleRequest } from '../dto/request/create-sale.request';

@Injectable()
export class CreateSaleUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(
    request: CreateSaleRequest,
    createdById: string,
  ): Promise<ISale> {
    if (!request.items?.length) {
      throw new BadRequestException('Sale must have at least one item');
    }

    if (!request.clientId && !request.clientName) {
      throw new BadRequestException(
        'Sale must have either clientId or clientName',
      );
    }

    const items: CreateSaleItemData[] = request.items.map((item) => ({
      itemType: item.itemType ?? null,
      itemId: item.itemId ?? null,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    const saleData: CreateSaleData = {
      type: request.type!,
      quotationId: request.quotationId ?? null,
      clientId: request.clientId ?? null,
      clientName: request.clientName ?? null,
      status: request.status ?? SaleStatus.DRAFT,
      saleDate: request.saleDate ? new Date(request.saleDate) : null,
      createdById,
    };

    return this.executeWithData(saleData, items);
  }

  async executeWithData(
    data: CreateSaleData,
    items: CreateSaleItemData[],
  ): Promise<ISale> {
    if (!items?.length) {
      throw new BadRequestException('Sale must have at least one item');
    }

    if (!data.clientId && !data.clientName) {
      throw new BadRequestException(
        'Sale must have either clientId or clientName',
      );
    }

    const fullData: CreateSaleData = {
      ...data,
      status: data.status ?? SaleStatus.DRAFT,
    };
    return this.salesRepository.create(fullData, items);
  }
}
