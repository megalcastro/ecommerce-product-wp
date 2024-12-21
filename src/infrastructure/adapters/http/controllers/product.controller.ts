import { Controller, Put, Body, Param } from '@nestjs/common';
import { UpdateProductStockUseCase } from '../../../../core/domain/use-cases/update-product-stock.use-case';


@Controller('products') 
export class ProductController {
  constructor(private readonly updateProductStockUseCase: UpdateProductStockUseCase) {}

  @Put(':id/stock')
  async updateStock(
    @Param('id') id: string,
    @Body('amount') amount: number,
  ): Promise<any> {
    console.log('updateStock', id, amount);
    const result = await this.updateProductStockUseCase.execute(id, amount);
    if (result.isFailure()) {
      return { status: 'error', message: result.error };
    }

    return { status: 'success', product: result.value };
  }
}
