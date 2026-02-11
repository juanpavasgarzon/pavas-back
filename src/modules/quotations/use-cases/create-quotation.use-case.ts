import { BadRequestException, Injectable } from '@nestjs/common';
import { QuotationStatus } from '../enums/quotation-status.enum';
import type {
  CreateQuotationItemData,
  IQuotation,
} from '../interfaces/quotation.interface';
import { QuotationsRepository } from '../repositories/quotations.repository';
import type { CreateQuotationRequest } from '../dto/request/create-quotation.request';

@Injectable()
export class CreateQuotationUseCase {
  constructor(private readonly quotationsRepository: QuotationsRepository) {}

  async execute(
    request: CreateQuotationRequest,
    createdById: string,
  ): Promise<IQuotation> {
    if (!request.items?.length) {
      throw new BadRequestException('Quotation must have at least one item');
    }

    const items: CreateQuotationItemData[] = request.items.map((item) => ({
      itemType: item.itemType ?? null,
      itemId: item.itemId ?? null,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    const quotationData = {
      clientName: request.clientName,
      status: request.status ?? QuotationStatus.DRAFT,
      validUntil: request.validUntil ? new Date(request.validUntil) : null,
      createdById,
    };

    const quotation = await this.quotationsRepository.create(
      quotationData,
      items,
    );
    return quotation;
  }
}
