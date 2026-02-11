import { ConflictException, Injectable } from '@nestjs/common';
import type {
  CreateServiceData,
  IService,
} from '../../interfaces/service.interface';
import { ServicesRepository } from '../../repositories/services.repository';

@Injectable()
export class CreateServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(data: CreateServiceData): Promise<IService> {
    const existing = await this.servicesRepository.findByCode(data.code);
    if (existing) {
      throw new ConflictException('Service code already exists');
    }
    return this.servicesRepository.create(data);
  }
}
