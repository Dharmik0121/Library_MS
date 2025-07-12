import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressFileupload from "express-fileupload";

import { config } from "dotenv";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

import authRouter from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";

import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAcount } from "./services/removeUnverifiedAccounts.js";

// ✅ Load environment variables
dotenv.config();
config({ path: "./config/config.env" });

// ✅ Create app instance
export const app = express();

// ✅ CORS configuration — IMPORTANT
app.use(
  cors({
    origin: ["http://localhost:5173", "https://library-ms-qgex.onrender.com/"] // e.g. "https://your-frontend.vercel.app"
    credentials: true, // ⬅️ allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressFileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

// ✅ Background tasks
notifyUsers();
removeUnverifiedAcount();

// ✅ DB Connection
connectDB();

// ✅ Error handling
app.use(errorMiddleware);
