import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationResponse } from 'src/common';
import { Permission, RequirePermissions } from 'src/modules/auth';
import { CreateClientRequest } from '../dto/request/create-client.request';
import { UpdateClientRequest } from '../dto/request/update-client.request';
import { ClientsQueryRequest } from '../dto/request/clients-query.request';
import { ClientResponse } from '../dto/response/client.response';
import { CreateClientUseCase } from '../use-cases/create-client.use-case';
import { DeleteClientUseCase } from '../use-cases/delete-client.use-case';
import { FindAllClientsUseCase } from '../use-cases/find-all-clients.use-case';
import { FindClientByIdUseCase } from '../use-cases/find-client-by-id.use-case';
import { UpdateClientUseCase } from '../use-cases/update-client.use-case';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
    private readonly findClientByIdUseCase: FindClientByIdUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.CLIENTS_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateClientRequest): Promise<ClientResponse> {
    const client = await this.createClientUseCase.execute(request);
    return new ClientResponse(client);
  }

  @Get()
  @RequirePermissions(Permission.CLIENTS_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: ClientsQueryRequest,
  ): Promise<PaginationResponse<ClientResponse>> {
    const result = await this.findAllClientsUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((c) => new ClientResponse(c)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.CLIENTS_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ClientResponse> {
    const client = await this.findClientByIdUseCase.execute(id);
    return new ClientResponse(client);
  }

  @Patch(':id')
  @RequirePermissions(Permission.CLIENTS_UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateClientRequest,
  ): Promise<ClientResponse> {
    const client = await this.updateClientUseCase.execute(id, request);
    return new ClientResponse(client);
  }

  @Delete(':id')
  @RequirePermissions(Permission.CLIENTS_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteClientUseCase.execute(id);
  }
}
