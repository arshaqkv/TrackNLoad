import { Product } from "../../../../domain/entities/product.entity";
import { IProductRepository } from "../../../../domain/interfaces/product.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class CreateProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: Product): Promise<void> {
    const { name, price, category, image } = data;

    if (!name || !price || !category || !image) {
      throw new CustomError("All Fields Required", HttpStatus.BAD_REQUEST);
    }

    const product = await this.productRepository.findProductByName(name);

    if (product) {
      throw new CustomError("Product already exists", HttpStatus.BAD_REQUEST);
    }

    const newProduct = new Product(name, price, category, image);

    await this.productRepository.createProduct(newProduct);
  }
}
