import { NextFunction, Request, Response } from "express";
import { ProductDIContainer } from "../../infrastructure/DI/ProductDIContainer";
import { HttpStatus } from "../../utils/httpStatus";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const image = req.file?.filename;
      const createProduct = ProductDIContainer.getCreateProductUseCase();
      await createProduct.execute({ ...req.body, image });
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: "Product added" });
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const editProduct = ProductDIContainer.getEditProductUseCase();
      await editProduct.execute(id, req.body);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Product updated" });
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getProduct = ProductDIContainer.getSingleProductUseCase();
      const product = await getProduct.execute(id);
      res.status(HttpStatus.OK).json({ success: true, product });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deleteProduct = ProductDIContainer.getDeleteProductUseCase();
      await deleteProduct.execute(id);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllProducts = ProductDIContainer.getAllProductUseCase();
      const products = await getAllProducts.execute();
      res.status(HttpStatus.OK).json({ products });
    } catch (error) {
      next(error);
    }
  }
}

const productController = new ProductController();
export { productController };
