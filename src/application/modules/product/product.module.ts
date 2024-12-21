import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmProductRepository } from '../../../infrastructure/persistence/repositories/typeorm-product.repository';
import { ProductEntity } from '../../../core/domain/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])], // Asegúrate de que ProductEntity esté registrado
  providers: [
    ProductService,
    {
      provide: 'ProductRepository', // Usa una cadena como identificador único
      useClass: TypeOrmProductRepository, // Usa la implementación concreta del repositorio
    },
  ],
  exports: [ProductService], // Exporta el servicio si lo necesitas en otros módulos
})
export class ProductModule {}
