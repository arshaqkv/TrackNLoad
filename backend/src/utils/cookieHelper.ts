import { config } from "../config/config";

interface ICookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "lax" | "strict" | "none";
  maxAge: number;
}

export const accessCookieOptions: ICookieOptions = {
  httpOnly: true,
  secure: config.ENVIRONMENT === "production",
  sameSite: config.ENVIRONMENT === "production" ? "none" : "strict",
  maxAge: 1 * 60 * 60 * 1000,
};
