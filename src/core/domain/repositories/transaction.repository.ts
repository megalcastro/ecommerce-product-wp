import { TransactionEntity } from '../entities/transaction.entity';

export interface TransactionRepository {
  createTransaction(transaction: Partial<TransactionEntity>): Promise<TransactionEntity>;
  updateStatus(transactionId: string, status: string): Promise<void>;
  findByTransactionNumber(transactionNumber: string): Promise<TransactionEntity | null>;
}
