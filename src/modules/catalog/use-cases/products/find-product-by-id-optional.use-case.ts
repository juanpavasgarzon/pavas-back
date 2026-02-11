import { Injectable } from '@nestjs/common';
import type { IProduct } from '../../interfaces/product.interface';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class FindProductByIdOptionalUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<IProduct | null> {
    return this.productsRepository.findById(id);
  }
}
