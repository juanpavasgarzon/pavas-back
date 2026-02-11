import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationResponse } from 'src/common';
import { CurrentUser, Permission, RequirePermissions } from 'src/modules/auth';
import type { IUser } from 'src/modules/users/interfaces/user.interface';
import { CreateMovementRequest } from '../dto/request/create-movement.request';
import { MovementsQueryRequest } from '../dto/request/movements-query.request';
import { MovementResponse } from '../dto/response/movement.response';
import { CreateMovementUseCase } from '../use-cases/create-movement.use-case';
import { FindAllMovementsUseCase } from '../use-cases/find-all-movements.use-case';
import { FindMovementByIdUseCase } from '../use-cases/find-movement-by-id.use-case';

@Controller('inventory/movements')
export class InventoryController {
  constructor(
    private readonly createMovementUseCase: CreateMovementUseCase,
    private readonly findAllMovementsUseCase: FindAllMovementsUseCase,
    private readonly findMovementByIdUseCase: FindMovementByIdUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.INVENTORY_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreateMovementRequest,
    @CurrentUser() user: IUser,
  ) {
    const movementDate = request.movementDate
      ? new Date(request.movementDate)
      : undefined;

    const movementData = {
      productId: request.productId,
      type: request.type,
      quantity: request.quantity,
      referenceType: request.referenceType ?? null,
      referenceId: request.referenceId ?? null,
      movementDate: movementDate,
      notes: request.notes ?? null,
    };

    const movement = await this.createMovementUseCase.execute(
      movementData,
      user.id,
    );
    return new MovementResponse(movement);
  }

  @Get()
  @RequirePermissions(Permission.INVENTORY_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: MovementsQueryRequest,
  ): Promise<PaginationResponse<MovementResponse>> {
    const result = await this.findAllMovementsUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((m) => new MovementResponse(m)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.INVENTORY_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const movement = await this.findMovementByIdUseCase.execute(id);
    return new MovementResponse(movement);
  }
}
