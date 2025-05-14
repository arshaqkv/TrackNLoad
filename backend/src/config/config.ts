import dotenv from "dotenv";
dotenv.config();

interface CorsConfig {
  CLIENT_URL: string;
  ALLOWED_HEADERS: string[];
  ALLOWED_METHODS: string[];
  CREDENTIALS: boolean;
}

interface Config {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  ENVIRONMENT: string;
  CORS: CorsConfig;
}

export const config: Config = {
  PORT: parseInt(process.env.PORT || "4000", 10),
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ENVIRONMENT: process.env.NODE_ENV as string,
  CORS: {
    CLIENT_URL: (process.env.CLIENT_URL as string) || "http://localhost:5173",
    ALLOWED_HEADERS: ["Content-type", "Authorization"],
    ALLOWED_METHODS: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    CREDENTIALS: true,
  },
};
