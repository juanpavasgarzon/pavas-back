import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { QuotationStatus } from '../enums/quotation-status.enum';
import type { IQuotation } from '../interfaces/quotation.interface';
import { QuotationsRepository } from '../repositories/quotations.repository';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import { SalesService } from 'src/modules/sales/services/sales.service';
import { SaleType } from 'src/modules/sales/enums/sale-type.enum';
import { SaleStatus } from 'src/modules/sales/enums/sale-status.enum';

@Injectable()
export class ApproveQuotationUseCase {
  constructor(
    private readonly quotationsRepository: QuotationsRepository,
    private readonly clientsService: ClientsService,
    private readonly salesService: SalesService,
  ) {}

  async execute(quotationId: string, createdById: string): Promise<IQuotation> {
    const quotation = await this.quotationsRepository.findById(
      quotationId,
      true,
    );
    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }
    if (quotation.status === QuotationStatus.ACCEPTED) {
      throw new BadRequestException('Quotation is already accepted');
    }
    if (quotation.status === QuotationStatus.REJECTED) {
      throw new BadRequestException('Cannot approve a rejected quotation');
    }

    let clientId: string | null = null;
    const clientName = quotation.clientName?.trim() || 'Cliente';
    let client = await this.clientsService.findFirstByName(clientName);
    if (!client) {
      const code = `CLI-${randomUUID().slice(0, 8).toUpperCase()}`;
      client = await this.clientsService.create({
        code,
        name: clientName,
      });
    }
    clientId = client.id;

    const saleItems = (quotation.items ?? []).map((item) => ({
      itemType: item.itemType ?? null,
      itemId: item.itemId ?? null,
      description: item.description,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
    }));

    await this.salesService.create(
      {
        type: SaleType.PROJECT,
        quotationId: quotation.id,
        clientId,
        clientName,
        status: SaleStatus.DRAFT,
        saleDate: null,
        createdById,
      },
      saleItems,
    );

    return this.quotationsRepository.updateStatus(
      quotationId,
      QuotationStatus.ACCEPTED,
    );
  }
}
