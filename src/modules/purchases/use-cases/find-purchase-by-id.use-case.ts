import { Injectable, NotFoundException } from '@nestjs/common';
import type { IPurchase } from '../interfaces/purchase.interface';
import { PurchasesRepository } from '../repositories/purchases.repository';

@Injectable()
export class FindPurchaseByIdUseCase {
  constructor(private readonly purchasesRepository: PurchasesRepository) {}

  async execute(id: string): Promise<IPurchase> {
    const purchase = await this.purchasesRepository.findById(id, true);
    if (!purchase) {
      throw new NotFoundException('Purchase not found');
    }
    return purchase;
  }
}
