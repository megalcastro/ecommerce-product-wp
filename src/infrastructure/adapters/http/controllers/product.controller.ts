// src/infrastructure/adapters/http/controllers/product.controller.ts
import { Request, Response } from 'express';
import { UpdateProductStockUseCase } from '../../../../core/domain/use-cases/update-product-stock.use-case';
import { Result } from '../../../../core/utils/result';

class ProductController {
  constructor(private readonly updateProductStockUseCase: UpdateProductStockUseCase) {}

  async updateStock(req: Request, res: Response): Promise<Response> {
    const { productId, amount } = req.body;

    // Ejecutar el caso de uso para actualizar stock
    const result = await this.updateProductStockUseCase.execute(productId, amount);

    // Manejar el resultado con la clase `Result`
    if (result.isFailure()) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ product: result.value });
  }
}

export { ProductController };
