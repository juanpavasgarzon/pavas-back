import {
  Body,
  Controller,
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
import { CurrentUser, Permission, RequirePermissions } from 'src/modules/auth';
import type { IUser } from 'src/modules/users/interfaces/user.interface';
import { CreatePurchaseOrderRequest } from '../dto/request/create-purchase-order.request';
import { PurchaseOrdersQueryRequest } from '../dto/request/purchase-orders-query.request';
import { PurchaseOrderResponse } from '../dto/response/purchase-order.response';
import { CreatePurchaseOrderUseCase } from '../use-cases/create-purchase-order.use-case';
import { FindAllPurchaseOrdersUseCase } from '../use-cases/find-all-purchase-orders.use-case';
import { FindPurchaseOrderByIdUseCase } from '../use-cases/find-purchase-order-by-id.use-case';
import { UpdatePurchaseOrderStatusUseCase } from '../use-cases/update-purchase-order-status.use-case';
import { UpdatePurchaseOrderStatusRequest } from '../dto/request/update-purchase-order-status.request';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(
    private readonly createPurchaseOrderUseCase: CreatePurchaseOrderUseCase,
    private readonly findAllPurchaseOrdersUseCase: FindAllPurchaseOrdersUseCase,
    private readonly findPurchaseOrderByIdUseCase: FindPurchaseOrderByIdUseCase,
    private readonly updatePurchaseOrderStatusUseCase: UpdatePurchaseOrderStatusUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.PURCHASE_ORDERS_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreatePurchaseOrderRequest,
    @CurrentUser() user: IUser,
  ) {
    const order = await this.createPurchaseOrderUseCase.execute(
      request,
      user.id,
    );
    return new PurchaseOrderResponse(order);
  }

  @Get()
  @RequirePermissions(Permission.PURCHASE_ORDERS_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: PurchaseOrdersQueryRequest) {
    const result = await this.findAllPurchaseOrdersUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((o) => new PurchaseOrderResponse(o)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.PURCHASE_ORDERS_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.findPurchaseOrderByIdUseCase.execute(id);
    return new PurchaseOrderResponse(order);
  }

  @Patch(':id/status')
  @RequirePermissions(Permission.PURCHASE_ORDERS_UPDATE)
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePurchaseOrderStatusRequest,
  ) {
    const order = await this.updatePurchaseOrderStatusUseCase.execute(
      id,
      body.status,
    );
    return new PurchaseOrderResponse(order);
  }
}
