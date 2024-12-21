import { Result } from '../../utils/result';
import { ProductRepository } from '../repositories/product.repository';
import { ProductEntity } from '../entities/product.entity';

class UpdateProductStockUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string, amount: number): Promise<Result<ProductEntity>> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return Result.failure('Product not found');
    }

    if (amount < 0) {
      return Result.failure('Amount cannot be negative');
    }

    try {
      product.stock += amount;
      await this.productRepository.updateStock(productId, product.stock);

      return Result.success(product);
    } catch (error) {
      return Result.failure(`Failed to update product stock: ${error.message}`);
    }
  }
}

export { UpdateProductStockUseCase };
