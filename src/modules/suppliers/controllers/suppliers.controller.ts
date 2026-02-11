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
import { CreateSupplierRequest } from '../dto/request/create-supplier.request';
import { SuppliersQueryRequest } from '../dto/request/suppliers-query.request';
import { UpdateSupplierRequest } from '../dto/request/update-supplier.request';
import { SupplierResponse } from '../dto/response/supplier.response';
import { SuppliersService } from '../services/suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @RequirePermissions(Permission.SUPPLIERS_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateSupplierRequest) {
    const supplier = await this.suppliersService.create(request);
    return new SupplierResponse(supplier);
  }

  @Get()
  @RequirePermissions(Permission.SUPPLIERS_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: SuppliersQueryRequest,
  ): Promise<PaginationResponse<SupplierResponse>> {
    const result = await this.suppliersService.findAll(query);
    return new PaginationResponse(
      result.data.map((s) => new SupplierResponse(s)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.SUPPLIERS_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const supplier = await this.suppliersService.findById(id);
    return new SupplierResponse(supplier);
  }

  @Patch(':id')
  @RequirePermissions(Permission.SUPPLIERS_UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateSupplierRequest,
  ) {
    const supplier = await this.suppliersService.update(id, request);
    return new SupplierResponse(supplier);
  }

  @Delete(':id')
  @RequirePermissions(Permission.SUPPLIERS_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.suppliersService.delete(id);
  }
}
