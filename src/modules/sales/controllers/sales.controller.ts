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
import { CreateSaleRequest } from '../dto/request/create-sale.request';
import { SalesQueryRequest } from '../dto/request/sales-query.request';
import { SaleResponse } from '../dto/response/sale.response';
import { CreateSaleUseCase } from '../use-cases/create-sale.use-case';
import { FindAllSalesUseCase } from '../use-cases/find-all-sales.use-case';
import { ConfirmSaleUseCase } from '../use-cases/confirm-sale.use-case';
import { FindSaleByIdUseCase } from '../use-cases/find-sale-by-id.use-case';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly findAllSalesUseCase: FindAllSalesUseCase,
    private readonly findSaleByIdUseCase: FindSaleByIdUseCase,
    private readonly confirmSaleUseCase: ConfirmSaleUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.SALES_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreateSaleRequest,
    @CurrentUser() user: IUser,
  ): Promise<SaleResponse> {
    const sale = await this.createSaleUseCase.execute(request, user.id);
    return new SaleResponse(sale);
  }

  @Get()
  @RequirePermissions(Permission.SALES_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: SalesQueryRequest,
  ): Promise<PaginationResponse<SaleResponse>> {
    const result = await this.findAllSalesUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((s) => new SaleResponse(s)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.SALES_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SaleResponse> {
    const sale = await this.findSaleByIdUseCase.execute(id);
    return new SaleResponse(sale);
  }

  @Patch(':id/confirm')
  @RequirePermissions(Permission.SALES_UPDATE)
  @HttpCode(HttpStatus.OK)
  async confirm(@Param('id', ParseUUIDPipe) id: string): Promise<SaleResponse> {
    const sale = await this.confirmSaleUseCase.execute(id);
    return new SaleResponse(sale);
  }
}
