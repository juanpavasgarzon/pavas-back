import { ConflictException, Injectable } from '@nestjs/common';
import type {
  IService,
  UpdateServiceData,
} from '../../interfaces/service.interface';
import { ServicesRepository } from '../../repositories/services.repository';

@Injectable()
export class UpdateServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: string, data: UpdateServiceData): Promise<IService> {
    if (data.code) {
      const existing = await this.servicesRepository.findByCode(data.code);
      if (existing && existing.id !== id) {
        throw new ConflictException('Service code already exists');
      }
    }
    return this.servicesRepository.update(id, data);
  }
}
