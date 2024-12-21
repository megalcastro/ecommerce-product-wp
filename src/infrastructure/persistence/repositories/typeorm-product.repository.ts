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
    console.log(`Searching product with ID: ${productId}`);
    const product = await this.repository.findOne({ where: { id: productId } });
    console.log(`Product found:`, product);
    return product || null;
  }

  async updateStock(productId: string, stock: number): Promise<void> {
    console.log(`Updating stock for product ${productId} to ${stock}`);
    await this.repository.update(productId, { stock });
    console.log(`Stock updated successfully`);
  }
}
