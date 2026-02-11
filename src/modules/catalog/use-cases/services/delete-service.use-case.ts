import { Injectable, NotFoundException } from '@nestjs/common';
import { ServicesRepository } from '../../repositories/services.repository';

@Injectable()
export class DeleteServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: string): Promise<void> {
    const service = await this.servicesRepository.findById(id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    await this.servicesRepository.delete(id);
  }
}
