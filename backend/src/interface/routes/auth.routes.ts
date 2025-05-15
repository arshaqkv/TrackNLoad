import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router
  .post("/login", authController.loginTD)
  .post("/logout", authController.logout);

export { router as authRoutes };
