import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { IService } from '../../interfaces/service.interface';
import { ServicesRepository } from '../../repositories/services.repository';
import type { ServicesQueryRequest } from '../../dto/request/services-query.request';

@Injectable()
export class FindAllServicesUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(
    query: ServicesQueryRequest,
  ): Promise<PaginationResponse<IService>> {
    const qb = this.servicesRepository.createQueryBuilder('service');
    return paginate(qb, query, {
      alias: 'service',
      searchFields: ['code', 'name'],
    });
  }
}
