import express, { Request, Response, NextFunction, Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/db";
import { errorHandler } from "../interface/middlewares/error.middleware";

import { authRoutes } from "../interface/routes/auth.routes";
import { adminRoutes } from "../interface/routes/admin.routes";
import { tdRoutes } from "../interface/routes/td.routes";

const app: Application = express();
const PORT = config.PORT;

app.use(express.static(path.join(__dirname, '../uploads/product')));

//midllewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors setup 
app.use(
  cors({
    origin: config.CORS.CLIENT_URL,
    allowedHeaders: config.CORS.ALLOWED_HEADERS,
    methods: config.CORS.ALLOWED_METHODS,
    credentials: config.CORS.CREDENTIALS,
  })
);

//test api
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "API is working" });
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/td", tdRoutes)

app.use(errorHandler);

//listen port
app.listen(PORT, () => {
  console.log(`TrackNLoad Server running on http://localhost:${PORT}`);
  connectDB();
});
