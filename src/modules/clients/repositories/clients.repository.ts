import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Client } from '../entities/client.entity';
import type {
  CreateClientData,
  IClient,
  UpdateClientData,
} from '../interfaces/client.interface';

@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  createQueryBuilder(alias: string = 'client'): SelectQueryBuilder<Client> {
    return this.repository.createQueryBuilder(alias);
  }

  async create(data: CreateClientData): Promise<IClient> {
    const client = this.repository.create(data);
    return this.repository.save(client);
  }

  async findById(id: string): Promise<IClient | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<IClient | null> {
    return this.repository.findOne({ where: { code } });
  }

  async update(id: string, data: UpdateClientData): Promise<IClient> {
    await this.repository.update(id, data);
    const client = await this.findById(id);
    return client!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
