import { Injectable } from '@nestjs/common';
import type { IClient } from '../interfaces/client.interface';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class FindClientFirstByNameUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(name: string): Promise<IClient | null> {
    return this.clientsRepository.findFirstByName(name);
  }
}
