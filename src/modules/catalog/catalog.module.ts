import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';
import { CatalogService } from './services/catalog.service';
import { CreateProductUseCase } from './use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/products/delete-product.use-case';
import { FindAllProductsUseCase } from './use-cases/products/find-all-products.use-case';
import { FindProductByIdUseCase } from './use-cases/products/find-product-by-id.use-case';
import { UpdateProductUseCase } from './use-cases/products/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductsRepository,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    CatalogService,
  ],
  exports: [CatalogService],
})
export class CatalogModule {}
