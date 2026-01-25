import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<void> {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productsRepository.delete(id);
  }
}
