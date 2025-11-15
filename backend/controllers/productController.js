import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// CREATE Product
export const addProduct = async (req, res) => {
    try {
        const { name, price, mainCategory, subCategory, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !price || !mainCategory || !subCategory || !description)
            return res.status(400).json({ message: "All fields are required" });

        const newProduct = new Product({
            name,
            price,
            mainCategory,
            subCategory,
            description,
            image,
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Product created", product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "❌ Server error while creating product" });
    }
};

// READ All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

// READ Single Product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
    try {
        const { name, price, mainCategory, subCategory, description } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // If new image uploaded → delete old one
        if (req.file && product.image) {
            const oldPath = path.join("uploads", product.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.mainCategory = mainCategory || product.mainCategory;
        product.subCategory = subCategory || product.subCategory;
        product.description = description || product.description;
        if (req.file) product.image = req.file.filename;

        const updated = await product.save();
        res.status(200).json({ message: "✅ Product updated", product: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "❌ Error updating product" });
    }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.image) {
            const imgPath = path.join("uploads", product.image);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        await product.deleteOne();
        res.status(200).json({ message: "🗑️ Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "❌ Error deleting product" });
    }
};
