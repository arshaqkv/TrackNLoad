import { Product } from "../../../../domain/entities/product.entity";
import { IProductRepository } from "../../../../domain/interfaces/product.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class EditProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, data: Partial<Product>): Promise<void> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new CustomError("Product not found", HttpStatus.NOT_FOUND);
    }

    await this.productRepository.editProduct(id, data);
  }
}
