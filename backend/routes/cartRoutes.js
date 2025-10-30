import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js"; // 🔒 middleware for JWT auth

const router = express.Router();

// 🔹 Add to cart
router.post("/add", protect, addToCart);

// 🔹 Get user's cart
router.get("/", protect, getCart);

// 🔹 Remove product from cart
router.delete("/remove/:productId", protect, removeFromCart);

export default router;
