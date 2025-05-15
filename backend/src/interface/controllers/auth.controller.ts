import { NextFunction, Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/DI/AuthDIContainer";
import { accessCookieOptions } from "../../utils/cookieHelper";
import { HttpStatus } from "../../utils/httpStatus";
import { config } from "../../config/config";

class AuthController {
  //truck driver login
  async loginTD(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, password } = req.body;
      const loginTD = AuthDIContainer.getLoginTDUseCase();
      const { accessToken, user } = await loginTD.execute({ mobile, password });
      res
        .cookie("accessToken", accessToken, accessCookieOptions)
        .status(HttpStatus.OK)
        .json({ success: true, message: "Admin logged in successfully", user });
    } catch (error) {
      next(error);
    }
  }

  //admin login
  async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, password } = req.body;
      const loginAdmin = AuthDIContainer.getLoginAdminUseCase();
      const { accessToken, user } = await loginAdmin.execute({
        mobile,
        password,
      });

      res
        .cookie("accessToken", accessToken, accessCookieOptions)
        .status(HttpStatus.OK)
        .json({
          succuess: true,
          message: "Admin Logged in successfully",
          user,
        });
    } catch (error) {
      next(error);
    }
  }

  //logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .clearCookie("accessToken", {
          httpOnly: true,
          secure: config.ENVIRONMENT === "production",
          sameSite: "strict",
        })
        .status(HttpStatus.OK)
        .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export { authController };
