import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import cloudinary from "cloudinary";
import errorMiddleware from "./middleware/error";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const fileUpload = require("express-fileupload");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
const app = express();
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
