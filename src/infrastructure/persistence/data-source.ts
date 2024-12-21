import { DataSource } from 'typeorm';
import { ProductEntity } from '../../core/domain/entities/product.entity';
import { TransactionEntity } from '../../core/domain/entities/transaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'hexagonal_store',
  entities: [ProductEntity, TransactionEntity],
  synchronize: false, // No usar en producción
  logging: true,
  migrations: ['./migrations/*.ts'],
});
