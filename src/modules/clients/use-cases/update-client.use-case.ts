import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IClient, UpdateClientData } from '../interfaces/client.interface';
import { ClientsRepository } from '../repositories/clients.repository';
import { ClientResponse } from '../dto/response/client.response';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  private async validateCode(code: string): Promise<void> {
    const existing = await this.clientsRepository.findByCode(code);
    if (existing) {
      throw new ConflictException('Client code already exists');
    }
  }

  async execute(id: string, data: UpdateClientData): Promise<IClient> {
    const existing = await this.clientsRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Client not found');
    }

    if (data.code !== undefined && data.code !== existing.code) {
      await this.validateCode(data.code);
    }

    const client = await this.clientsRepository.update(id, data);
    return new ClientResponse(client);
  }
}
