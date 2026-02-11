import { ConflictException, Injectable } from '@nestjs/common';
import type {
  ISupplier,
  UpdateSupplierData,
} from '../interfaces/supplier.interface';
import { SuppliersRepository } from '../repositories/suppliers.repository';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(id: string, data: UpdateSupplierData): Promise<ISupplier> {
    if (data.code) {
      const existing = await this.suppliersRepository.findByCode(data.code);
      if (existing && existing.id !== id) {
        throw new ConflictException('Supplier code already exists');
      }
    }
    return this.suppliersRepository.update(id, data);
  }
}
