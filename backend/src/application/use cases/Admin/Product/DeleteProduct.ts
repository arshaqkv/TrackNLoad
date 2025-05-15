import { IProductRepository } from "../../../../domain/interfaces/product.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";
import fs from "fs";

export class DeleteProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new CustomError("Product not found", HttpStatus.NOT_FOUND);
    }

    const imagePath = `src/uploads/product/${product.image}`;

    fs.unlink(imagePath, (err) => { 
      if (err) {
        throw new CustomError(
          `Failed to delete image: ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      }
      console.log("Image deleted successfully")
    });

    await this.productRepository.deleteProduct(id);
  }
}
