// src/core/use-cases/create-transaction.use-case.ts
import { Result } from '../../utils/result';
import { ProductRepository } from '../repositories/product.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionEntity } from '../entities/transaction.entity';

class CreateTransactionUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(product_id: string, amount: number): Promise<Result<TransactionEntity>> {
    // Obtener producto
    const product = await this.productRepository.findById(product_id);
    if (!product) {
      return Result.failure('Product not found');
    }

    // Validar stock
    if (product.stock < amount) {
      return Result.failure('Insufficient stock');
    }

    try {
      // Actualizar stock
      await this.productRepository.updateStock(product_id, product.stock - amount);

      // Crear transacción
      const transaction = await this.transactionRepository.createTransaction({
        product,
        amount,
        status: 'PENDING',
      });

      return Result.success(transaction);
    } catch (error) {
      return Result.failure(`Transaction creation failed: ${error.message}`);
    }
  }
}

export { CreateTransactionUseCase };
