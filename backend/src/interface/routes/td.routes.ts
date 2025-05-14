import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";
import { vendorController } from "../controllers/vendor.controller";
import { productController } from "../controllers/product.controller";
import { orderController } from "../controllers/order.controller";

const router = Router();

router
  .use(isAuthenticated, authorizeRole("truck driver"))
  .get("/vendor", vendorController.getAllVendors)
  .get("/product", productController.getAllProducts)
  .post("/order", orderController.createOrder)
  .get("/order", orderController.getOrdersForTD);

export { router as tdRoutes };
