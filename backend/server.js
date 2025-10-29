import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware order is important
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 add this line

// ✅ Static folder for uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port ${process.env.PORT}`)
);
