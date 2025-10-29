import express from "express";
import upload from "../middleware/multer.js";
import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// CRUD Routes
router.post("/add", upload.single("image"), addProduct);       // CREATE
router.get("/", getAllProducts);                               // READ all
router.get("/:id", getProductById);                            // READ single
router.put("/:id", upload.single("image"), updateProduct);     // UPDATE
router.delete("/:id", deleteProduct);                          // DELETE

export default router;
