import { ConflictException, Injectable } from '@nestjs/common';
import { UnitMeasure } from '../../enums/unit-measure.enum';
import type {
  CreateProductData,
  IProduct,
} from '../../interfaces/product.interface';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    data: Partial<CreateProductData> & { code: string; name: string },
  ): Promise<IProduct> {
    const existingProduct = await this.productsRepository.findByCode(data.code);
    if (existingProduct) {
      throw new ConflictException('Product code already exists');
    }

    return this.productsRepository.create({
      ...data,
      unitMeasure: data.unitMeasure ?? UnitMeasure.UNIT,
    });
  }
}
