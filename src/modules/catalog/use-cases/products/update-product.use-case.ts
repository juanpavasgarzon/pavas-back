import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  IProduct,
  UpdateProductData,
} from '../../interfaces/product.interface';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string, data: UpdateProductData): Promise<IProduct> {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (data.code && data.code !== existingProduct.code) {
      const productWithCode = await this.productsRepository.findByCode(
        data.code,
      );
      if (productWithCode) {
        throw new ConflictException('Product code already exists');
      }
    }

    return this.productsRepository.update(id, data);
  }
}
