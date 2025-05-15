import { Product } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/interfaces/product.repository";
import { ProductModel } from "../models/product.model";

export class MongoProductRepository implements IProductRepository {
  async createProduct(user: Product): Promise<Product> {
    const newProduct = new ProductModel(user);
    await newProduct.save();
    return newProduct;
  }

  async findProductByName(name: string): Promise<Product | null> {
    return await ProductModel.findOne({ name });
  }

  async findProductById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id);
  }

  async editProduct(
    id: string,
    data: Partial<Product>
  ): Promise<Product | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findAllProduct(): Promise<Product[]> {
    return await ProductModel.find();
  }

  async deleteProduct(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }
}
