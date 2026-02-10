import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import { ClientsQueryRequest } from '../dto/request/clients-query.request';
import type { IClient } from '../interfaces/client.interface';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class FindAllClientsUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(
    query: ClientsQueryRequest,
  ): Promise<PaginationResponse<IClient>> {
    const qb = this.clientsRepository.createQueryBuilder('client');

    return paginate(qb, query, {
      alias: 'client',
      searchFields: ['code', 'name', 'email'],
    });
  }
}
