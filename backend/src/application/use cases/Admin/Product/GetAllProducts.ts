import { Product } from "../../../../domain/entities/product.entity";
import { IProductRepository } from "../../../../domain/interfaces/product.repository";

export class GetAllProducts {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAllProduct();
  }
}
