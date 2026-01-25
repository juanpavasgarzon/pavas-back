import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import type {
  CreateProductData,
  IProduct,
  UpdateProductData,
} from '../interfaces/product.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(data: CreateProductData): Promise<IProduct> {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }

  createQueryBuilder(alias: string = 'product'): SelectQueryBuilder<Product> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<IProduct | null> {
    return this.repository.findOne({ where: { code } });
  }

  async update(id: string, data: UpdateProductData): Promise<IProduct> {
    await this.repository.update(id, data);
    const product = await this.findById(id);
    return product!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
