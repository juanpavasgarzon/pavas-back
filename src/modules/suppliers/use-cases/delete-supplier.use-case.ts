import { Injectable, NotFoundException } from '@nestjs/common';
import { SuppliersRepository } from '../repositories/suppliers.repository';

@Injectable()
export class DeleteSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(id: string): Promise<void> {
    const supplier = await this.suppliersRepository.findById(id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    await this.suppliersRepository.delete(id);
  }
}
