import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Service } from '../entities/service.entity';
import type {
  CreateServiceData,
  IService,
  UpdateServiceData,
} from '../interfaces/service.interface';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {}

  createQueryBuilder(alias: string = 'service'): SelectQueryBuilder<Service> {
    return this.repository.createQueryBuilder(alias);
  }

  async create(data: CreateServiceData): Promise<IService> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<IService | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<IService | null> {
    return this.repository.findOne({ where: { code } });
  }

  async update(id: string, data: UpdateServiceData): Promise<IService> {
    await this.repository.update(id, data);
    const service = await this.findById(id);
    return service!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
