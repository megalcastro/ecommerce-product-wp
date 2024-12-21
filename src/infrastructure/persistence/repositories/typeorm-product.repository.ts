import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../../core/domain/entities/product.entity';
import { ProductRepository } from '../../../core/domain/repositories/product.repository';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findById(productId: string): Promise<ProductEntity | null> {
    return this.repository.findOne({ where: { id: productId } });
  }

  async updateStock(productId: string, stock: number): Promise<void> {
    await this.repository.update(productId, { stock });
  }
}
