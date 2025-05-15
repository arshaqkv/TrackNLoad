import { CreateProduct } from "../../application/use cases/Admin/Product/CreateProduct";
import { DeleteProduct } from "../../application/use cases/Admin/Product/DeleteProduct";
import { EditProduct } from "../../application/use cases/Admin/Product/EditProduct";
import { GetAllProducts } from "../../application/use cases/Admin/Product/GetAllProducts";
import { GetProduct } from "../../application/use cases/Admin/Product/GetProduct";
import { MongoProductRepository } from "../repositories/mongo.product.repository";

class ProductDIContainer {
  static getProductRepository() {
    return new MongoProductRepository();
  }

  static getCreateProductUseCase() {
    return new CreateProduct(this.getProductRepository());
  }

  static getEditProductUseCase() {
    return new EditProduct(this.getProductRepository());
  }

  static getDeleteProductUseCase() {
    return new DeleteProduct(this.getProductRepository());
  }

  static getSingleProductUseCase() {
    return new GetProduct(this.getProductRepository());
  }

  static getAllProductUseCase() {
    return new GetAllProducts(this.getProductRepository());
  }
}

export { ProductDIContainer };
