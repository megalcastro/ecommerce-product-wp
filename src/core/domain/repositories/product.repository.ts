import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  findById(productId: string): Promise<ProductEntity | null>;
  updateStock(productId: string, stock: number): Promise<void>;
}
