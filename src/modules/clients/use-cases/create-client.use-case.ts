import { ConflictException, Injectable } from '@nestjs/common';
import type { CreateClientData, IClient } from '../interfaces/client.interface';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(data: CreateClientData): Promise<IClient> {
    const existing = await this.clientsRepository.findByCode(data.code);
    if (existing) {
      throw new ConflictException('Client code already exists');
    }

    return await this.clientsRepository.create(data);
  }
}
