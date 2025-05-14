import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../config/verifyToken";
import { CustomError } from "./error.middleware";
import { HttpStatus } from "../../utils/httpStatus";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new CustomError("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
  try {
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      throw new CustomError("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (role !== req.user?.role) {
      throw new CustomError(
        `Access denied. Not allowed to access this resource`,
        HttpStatus.FORBIDDEN
      );
    }
    next();
  };
};
