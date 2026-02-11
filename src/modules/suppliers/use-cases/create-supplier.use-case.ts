import { ConflictException, Injectable } from '@nestjs/common';
import type {
  CreateSupplierData,
  ISupplier,
} from '../interfaces/supplier.interface';
import { SuppliersRepository } from '../repositories/suppliers.repository';

@Injectable()
export class CreateSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(data: CreateSupplierData): Promise<ISupplier> {
    const existing = await this.suppliersRepository.findByCode(data.code);
    if (existing) {
      throw new ConflictException('Supplier code already exists');
    }
    return this.suppliersRepository.create(data);
  }
}
