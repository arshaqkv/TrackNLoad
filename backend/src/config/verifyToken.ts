import jwt from "jsonwebtoken";
import { config } from "./config";

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
