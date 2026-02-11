import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { ServicesController } from './controllers/services.controller';
import { Product } from './entities/product.entity';
import { Service } from './entities/service.entity';
import { ProductsRepository } from './repositories/products.repository';
import { ServicesRepository } from './repositories/services.repository';
import { CatalogService } from './services/catalog.service';
import { CreateProductUseCase } from './use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/products/delete-product.use-case';
import { FindAllProductsUseCase } from './use-cases/products/find-all-products.use-case';
import { FindProductByIdOptionalUseCase } from './use-cases/products/find-product-by-id-optional.use-case';
import { FindProductByIdUseCase } from './use-cases/products/find-product-by-id.use-case';
import { UpdateProductUseCase } from './use-cases/products/update-product.use-case';
import { CreateServiceUseCase } from './use-cases/services/create-service.use-case';
import { DeleteServiceUseCase } from './use-cases/services/delete-service.use-case';
import { FindAllServicesUseCase } from './use-cases/services/find-all-services.use-case';
import { FindServiceByIdUseCase } from './use-cases/services/find-service-by-id.use-case';
import { UpdateServiceUseCase } from './use-cases/services/update-service.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Service])],
  controllers: [ProductsController, ServicesController],
  providers: [
    ProductsRepository,
    ServicesRepository,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
    FindProductByIdOptionalUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    CreateServiceUseCase,
    FindAllServicesUseCase,
    FindServiceByIdUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
    CatalogService,
  ],
  exports: [CatalogService],
})
export class CatalogModule {}
