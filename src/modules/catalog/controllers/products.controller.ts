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
import { CreateProductRequest } from '../dto/request/create-product.request';
import { ProductsQueryRequest } from '../dto/request/products-query.request';
import { UpdateProductRequest } from '../dto/request/update-product.request';
import { ProductResponse } from '../dto/response/product.response';
import { CreateProductUseCase } from '../use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from '../use-cases/products/delete-product.use-case';
import { FindAllProductsUseCase } from '../use-cases/products/find-all-products.use-case';
import { FindProductByIdUseCase } from '../use-cases/products/find-product-by-id.use-case';
import { UpdateProductUseCase } from '../use-cases/products/update-product.use-case';

@Controller('catalog/products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.PRODUCTS_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() request: CreateProductRequest,
  ): Promise<ProductResponse> {
    const product = await this.createProductUseCase.execute(request);
    return new ProductResponse(product);
  }

  @Get()
  @RequirePermissions(Permission.PRODUCTS_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: ProductsQueryRequest,
  ): Promise<PaginationResponse<ProductResponse>> {
    const result = await this.findAllProductsUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((product) => new ProductResponse(product)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.PRODUCTS_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponse> {
    const product = await this.findProductByIdUseCase.execute(id);
    return new ProductResponse(product);
  }

  @Patch(':id')
  @RequirePermissions(Permission.PRODUCTS_UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateProductRequest,
  ): Promise<ProductResponse> {
    const product = await this.updateProductUseCase.execute(id, request);
    return new ProductResponse(product);
  }

  @Delete(':id')
  @RequirePermissions(Permission.PRODUCTS_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }
}
