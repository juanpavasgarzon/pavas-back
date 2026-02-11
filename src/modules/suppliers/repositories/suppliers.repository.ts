import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import type {
  CreateSupplierData,
  ISupplier,
  UpdateSupplierData,
} from '../interfaces/supplier.interface';

@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly repository: Repository<Supplier>,
  ) {}

  createQueryBuilder(alias: string = 'supplier'): SelectQueryBuilder<Supplier> {
    return this.repository.createQueryBuilder(alias);
  }

  async create(data: CreateSupplierData): Promise<ISupplier> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<ISupplier | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<ISupplier | null> {
    return this.repository.findOne({ where: { code } });
  }

  async update(id: string, data: UpdateSupplierData): Promise<ISupplier> {
    await this.repository.update(id, data);
    const supplier = await this.findById(id);
    return supplier!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
