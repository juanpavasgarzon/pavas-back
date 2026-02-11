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
import { CreateServiceRequest } from '../dto/request/create-service.request';
import { ServicesQueryRequest } from '../dto/request/services-query.request';
import { UpdateServiceRequest } from '../dto/request/update-service.request';
import { ServiceResponse } from '../dto/response/service.response';
import { CreateServiceUseCase } from '../use-cases/services/create-service.use-case';
import { DeleteServiceUseCase } from '../use-cases/services/delete-service.use-case';
import { FindAllServicesUseCase } from '../use-cases/services/find-all-services.use-case';
import { FindServiceByIdUseCase } from '../use-cases/services/find-service-by-id.use-case';
import { UpdateServiceUseCase } from '../use-cases/services/update-service.use-case';

@Controller('catalog/services')
export class ServicesController {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly findAllServicesUseCase: FindAllServicesUseCase,
    private readonly findServiceByIdUseCase: FindServiceByIdUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly deleteServiceUseCase: DeleteServiceUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.SERVICES_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateServiceRequest) {
    const service = await this.createServiceUseCase.execute(request);
    return new ServiceResponse(service);
  }

  @Get()
  @RequirePermissions(Permission.SERVICES_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: ServicesQueryRequest,
  ): Promise<PaginationResponse<ServiceResponse>> {
    const result = await this.findAllServicesUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((s) => new ServiceResponse(s)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.SERVICES_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const service = await this.findServiceByIdUseCase.execute(id);
    return new ServiceResponse(service);
  }

  @Patch(':id')
  @RequirePermissions(Permission.SERVICES_UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateServiceRequest,
  ) {
    const service = await this.updateServiceUseCase.execute(id, request);
    return new ServiceResponse(service);
  }

  @Delete(':id')
  @RequirePermissions(Permission.SERVICES_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteServiceUseCase.execute(id);
  }
}
