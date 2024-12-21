import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../../../core/domain/entities/transaction.entity';
import { TransactionRepository } from '../../../core/domain/repositories/transaction.repository';

@Injectable()
export class TypeOrmTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  async createTransaction(transaction: Partial<TransactionEntity>): Promise<TransactionEntity> {
    return this.repository.save(transaction);
  }

  async updateStatus(transactionId: string, status: string): Promise<void> {
    await this.repository.update(transactionId, { status });
  }

  async findByTransactionNumber(transactionNumber: string): Promise<TransactionEntity | null> {
    return this.repository.findOne({ where: { transactionNumber } });
  }
}
