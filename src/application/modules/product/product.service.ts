import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ProductRepository } from '../../../core/domain/repositories/product.repository'; // Importa la interfaz
import { ProductEntity } from '../../../core/domain/entities/product.entity'; // Importa la entidad

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository, // Inyección por nombre del proveedor
  ) {}

  async getProductById(productId: string): Promise<ProductEntity | null> {
    return this.productRepository.findById(productId);
  }

  async updateStock(productId: string, stock: number): Promise<void> {
    await this.productRepository.updateStock(productId, stock);
  }
}
