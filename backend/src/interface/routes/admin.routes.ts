import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";
import { truckDriverController } from "../controllers/td.controller";
import { vendorController } from "../controllers/vendor.controller";
import { productController } from "../controllers/product.controller";
import { authController } from "../controllers/auth.controller";
import upload from "../../infrastructure/middleware/upload";
import { orderController } from "../controllers/order.controller";

const router = Router();

router.post("/login", authController.loginAdmin);

router
  .route("/truck-driver")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(truckDriverController.getAllTD)
  .post(truckDriverController.createTD);

router
  .route("/truck-driver/:id")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(truckDriverController.getTD)
  .put(truckDriverController.editTD)
  .delete(truckDriverController.deleteTD);

router
  .route("/vendor")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(vendorController.getAllVendors)
  .post(vendorController.createVendor);

router
  .route("/vendor/:id")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(vendorController.getVendor)
  .put(vendorController.editVendor)
  .delete(vendorController.deleteVendor);

router
  .route("/product")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(productController.getAllProducts)
  .post(upload.single("image"), productController.createProduct);

router
  .route("/product/:id")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(productController.getProduct)
  .put(upload.single("image"), productController.editProduct)
  .delete(productController.deleteProduct);

router
  .route("/order")
  .all(isAuthenticated, authorizeRole("admin"))
  .get(orderController.getAllOrders);

export { router as adminRoutes };
