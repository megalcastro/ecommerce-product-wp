import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../../core/domain/entities/product.entity';
import { TypeOrmProductRepository } from '../../../infrastructure/persistence/repositories/typeorm-product.repository';
import { UpdateProductStockUseCase } from '../../../core/domain/use-cases/update-product-stock.use-case';
import { ProductController } from '../../../infrastructure/adapters/http/controllers/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository', // Proveedor explícito
      useClass: TypeOrmProductRepository, // Implementación concreta
    },
    {
      provide: UpdateProductStockUseCase,
      useFactory: (productRepository: TypeOrmProductRepository) => {
        return new UpdateProductStockUseCase(productRepository);
      },
      inject: ['ProductRepository'], // Inyección explícita
    },
  ],
})
export class ProductModule {}
