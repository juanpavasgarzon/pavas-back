import { Injectable } from '@nestjs/common';
import type { IClient } from '../interfaces/client.interface';
import { FindClientByIdUseCase } from '../use-cases/find-client-by-id.use-case';

@Injectable()
export class ClientsService {
  constructor(private readonly findClientByIdUseCase: FindClientByIdUseCase) {}

  async findById(id: string): Promise<IClient> {
    return await this.findClientByIdUseCase.execute(id);
  }
}
