import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';
import { ClientsRepository } from './repositories/clients.repository';
import { ClientsService } from './services/clients.service';
import { CreateClientUseCase } from './use-cases/create-client.use-case';
import { DeleteClientUseCase } from './use-cases/delete-client.use-case';
import { FindAllClientsUseCase } from './use-cases/find-all-clients.use-case';
import { FindClientByIdUseCase } from './use-cases/find-client-by-id.use-case';
import { UpdateClientUseCase } from './use-cases/update-client.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientsRepository,
    CreateClientUseCase,
    FindAllClientsUseCase,
    FindClientByIdUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    ClientsService,
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
