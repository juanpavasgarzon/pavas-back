import { Injectable } from '@nestjs/common';
import type { CreateClientData, IClient } from '../interfaces/client.interface';
import { CreateClientUseCase } from '../use-cases/create-client.use-case';
import { FindClientByIdUseCase } from '../use-cases/find-client-by-id.use-case';
import { FindClientFirstByNameUseCase } from '../use-cases/find-client-first-by-name.use-case';

@Injectable()
export class ClientsService {
  constructor(
    private readonly findClientByIdUseCase: FindClientByIdUseCase,
    private readonly findClientFirstByNameUseCase: FindClientFirstByNameUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  async findById(id: string): Promise<IClient> {
    return this.findClientByIdUseCase.execute(id);
  }

  async findFirstByName(name: string): Promise<IClient | null> {
    return this.findClientFirstByNameUseCase.execute(name);
  }

  async create(data: CreateClientData): Promise<IClient> {
    return this.createClientUseCase.execute(data);
  }
}
