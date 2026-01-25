import { Injectable, NotFoundException } from '@nestjs/common';
import type { IProduct } from '../../interfaces/product.interface';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class FindProductByIdUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
