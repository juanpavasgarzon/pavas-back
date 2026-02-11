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
import { CreateInvoiceRequest } from '../dto/request/create-invoice.request';
import { InvoicesQueryRequest } from '../dto/request/invoices-query.request';
import { InvoiceResponse } from '../dto/response/invoice.response';
import { CreateInvoiceUseCase } from '../use-cases/create-invoice.use-case';
import { FindAllInvoicesUseCase } from '../use-cases/find-all-invoices.use-case';
import { FindInvoiceByIdUseCase } from '../use-cases/find-invoice-by-id.use-case';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly findAllInvoicesUseCase: FindAllInvoicesUseCase,
    private readonly findInvoiceByIdUseCase: FindInvoiceByIdUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.INVOICES_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreateInvoiceRequest,
    @CurrentUser() user: IUser,
  ) {
    const invoice = await this.createInvoiceUseCase.execute(request, user.id);
    return new InvoiceResponse(invoice);
  }

  @Get()
  @RequirePermissions(Permission.INVOICES_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: InvoicesQueryRequest) {
    const result = await this.findAllInvoicesUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((i) => new InvoiceResponse(i)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.INVOICES_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const invoice = await this.findInvoiceByIdUseCase.execute(id);
    return new InvoiceResponse(invoice);
  }
}
