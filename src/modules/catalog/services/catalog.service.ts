import { Injectable } from '@nestjs/common';
import type { IProduct } from '../interfaces/product.interface';
import { FindProductByIdOptionalUseCase } from '../use-cases/products/find-product-by-id-optional.use-case';
import { FindProductByIdUseCase } from '../use-cases/products/find-product-by-id.use-case';

@Injectable()
export class CatalogService {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly findProductByIdOptionalUseCase: FindProductByIdOptionalUseCase,
  ) {}

  findProductById(id: string): Promise<IProduct> {
    return this.findProductByIdUseCase.execute(id);
  }

  getProductById(id: string): Promise<IProduct | null> {
    return this.findProductByIdOptionalUseCase.execute(id);
  }
}
