import { Injectable, NotFoundException } from '@nestjs/common';
import type { ISupplier } from '../interfaces/supplier.interface';
import { SuppliersRepository } from '../repositories/suppliers.repository';

@Injectable()
export class FindSupplierByIdUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(id: string): Promise<ISupplier> {
    const supplier = await this.suppliersRepository.findById(id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }
}
