import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.clientsRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Client not found');
    }

    await this.clientsRepository.delete(id);
  }
}
