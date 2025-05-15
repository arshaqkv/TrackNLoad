import { Product } from "../entities/product.entity";


export interface IProductRepository {
  createProduct(user: Product): Promise<Product>;
  findProductByName(name: string): Promise<Product | null>;
  findProductById(id: string): Promise<Product | null>;
  editProduct(id: string, data: Partial<Product>): Promise<Product | null>;
  findAllProduct(): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
}
