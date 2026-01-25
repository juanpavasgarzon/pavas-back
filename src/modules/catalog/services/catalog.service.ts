import { Injectable } from '@nestjs/common';
import type { IProduct } from '../interfaces/product.interface';
import { FindProductByIdUseCase } from '../use-cases/products/find-product-by-id.use-case';

@Injectable()
export class CatalogService {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  findProductById(id: string): Promise<IProduct> {
    return this.findProductByIdUseCase.execute(id);
  }
}
