import { Injectable, NotFoundException } from '@nestjs/common';
import { IClient } from '..';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class FindClientByIdUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(id: string): Promise<IClient> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }
}
