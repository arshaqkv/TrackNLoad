import jwt from "jsonwebtoken";
import { config } from "./config";

const ACCESS_TOKEN_SECRET = config.JWT_SECRET;

const generateAccessToken = (payload: {
  id?: string;
  role: string;
}): string => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};

export { generateAccessToken };
