import { Injectable, NotFoundException } from '@nestjs/common';
import type { IService } from '../../interfaces/service.interface';
import { ServicesRepository } from '../../repositories/services.repository';

@Injectable()
export class FindServiceByIdUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: string): Promise<IService> {
    const service = await this.servicesRepository.findById(id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }
}
