import { Injectable, NotFoundException } from '@nestjs/common';
import type { IQuotation } from '../interfaces/quotation.interface';
import { QuotationsRepository } from '../repositories/quotations.repository';

@Injectable()
export class FindQuotationByIdUseCase {
  constructor(private readonly quotationsRepository: QuotationsRepository) {}

  async execute(id: string): Promise<IQuotation> {
    const quotation = await this.quotationsRepository.findById(id, true);
    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }
    return quotation;
  }
}
