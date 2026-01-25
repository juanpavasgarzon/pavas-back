import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import { ProductsQueryRequest } from '../../dto/request/products-query.request';
import type { IProduct } from '../../interfaces/product.interface';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    query: ProductsQueryRequest,
  ): Promise<PaginationResponse<IProduct>> {
    const qb = this.productsRepository.createQueryBuilder('product');

    return paginate(qb, query, {
      alias: 'product',
      searchFields: ['code', 'name', 'description'],
    });
  }
}
