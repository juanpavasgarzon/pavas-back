import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/catalog/entities/product.entity';
import type { LowStockProductItem } from '../interfaces/report.interface';

@Injectable()
export class LowStockProductsUseCase {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(limit = 20): Promise<LowStockProductItem[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.managesInventory = :manages', { manages: true })
      .andWhere('product.current_stock <= product.minimum_stock')
      .orderBy('product.current_stock', 'ASC')
      .take(limit)
      .getMany();

    return products.map((p) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      currentStock: Number(p.currentStock),
      minimumStock: Number(p.minimumStock),
    }));
  }
}
