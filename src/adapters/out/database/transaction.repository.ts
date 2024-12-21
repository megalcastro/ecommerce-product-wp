import { Repository } from 'typeorm';
import { Transaction } from '../../../core/domain/entities/transaction.entity';

export  class TransactionRepository {
  constructor(private readonly ormRepo: Repository<Transaction>) {}

  async create(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.ormRepo.create(data);
    return this.ormRepo.save(transaction);
  }

  async update(id: number, data: Partial<Transaction>): Promise<void> {
    await this.ormRepo.update(id, data);
  }
}
