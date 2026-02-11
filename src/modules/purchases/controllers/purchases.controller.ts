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
import { CreatePurchaseRequest } from '../dto/request/create-purchase.request';
import { PurchasesQueryRequest } from '../dto/request/purchases-query.request';
import { PurchaseResponse } from '../dto/response/purchase.response';
import { CreatePurchaseUseCase } from '../use-cases/create-purchase.use-case';
import { FindAllPurchasesUseCase } from '../use-cases/find-all-purchases.use-case';
import { FindPurchaseByIdUseCase } from '../use-cases/find-purchase-by-id.use-case';

@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly createPurchaseUseCase: CreatePurchaseUseCase,
    private readonly findAllPurchasesUseCase: FindAllPurchasesUseCase,
    private readonly findPurchaseByIdUseCase: FindPurchaseByIdUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.PURCHASES_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreatePurchaseRequest,
    @CurrentUser() user: IUser,
  ) {
    const purchase = await this.createPurchaseUseCase.execute(request, user.id);
    return new PurchaseResponse(purchase);
  }

  @Get()
  @RequirePermissions(Permission.PURCHASES_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: PurchasesQueryRequest) {
    const result = await this.findAllPurchasesUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((p) => new PurchaseResponse(p)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.PURCHASES_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const purchase = await this.findPurchaseByIdUseCase.execute(id);
    return new PurchaseResponse(purchase);
  }
}
