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
import { CreateQuotationRequest } from '../dto/request/create-quotation.request';
import { QuotationsQueryRequest } from '../dto/request/quotations-query.request';
import { QuotationResponse } from '../dto/response/quotation.response';
import { CreateQuotationUseCase } from '../use-cases/create-quotation.use-case';
import { FindAllQuotationsUseCase } from '../use-cases/find-all-quotations.use-case';
import { FindQuotationByIdUseCase } from '../use-cases/find-quotation-by-id.use-case';

@Controller('quotations')
export class QuotationsController {
  constructor(
    private readonly createQuotationUseCase: CreateQuotationUseCase,
    private readonly findAllQuotationsUseCase: FindAllQuotationsUseCase,
    private readonly findQuotationByIdUseCase: FindQuotationByIdUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.QUOTATIONS_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreateQuotationRequest,
    @CurrentUser() user: IUser,
  ): Promise<QuotationResponse> {
    const quotation = await this.createQuotationUseCase.execute(
      request,
      user.id,
    );
    return new QuotationResponse(quotation);
  }

  @Get()
  @RequirePermissions(Permission.QUOTATIONS_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QuotationsQueryRequest,
  ): Promise<PaginationResponse<QuotationResponse>> {
    const result = await this.findAllQuotationsUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((q) => new QuotationResponse(q)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.QUOTATIONS_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<QuotationResponse> {
    const quotation = await this.findQuotationByIdUseCase.execute(id);
    return new QuotationResponse(quotation);
  }
}
