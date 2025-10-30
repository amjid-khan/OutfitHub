// backend/controllers/wishlistController.js
import Wishlist from "../models/wishlistModel.js";
import Product from "../models/Product.js";

// 🩵 Get User Wishlist
export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");

        if (!wishlist) {
            return res.status(200).json({ success: true, wishlist: { products: [] } });
        }

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        res.status(500).json({ message: "Error fetching wishlist" });
    }
};

// ❤️ Add to Wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId)
            return res.status(400).json({ message: "Product ID is required" });

        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.id, products: [] });
        }

        // Convert all to strings for comparison
        const exists = wishlist.products.some(
            (id) => id.toString() === productId.toString()
        );
        if (exists) {
            return res.status(200).json({ success: false, message: "Already in wishlist" });
        }

        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({ success: true, message: "Added to wishlist", wishlist });
    } catch (error) {
        console.error("Add Wishlist Error:", error);
        res.status(500).json({ message: "Error adding to wishlist" });
    }
};

// ❌ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId)
            return res.status(400).json({ message: "Product ID is required" });

        const wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist)
            return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId.toString()
        );

        await wishlist.save();
        res.status(200).json({ success: true, message: "Removed from wishlist", wishlist });
    } catch (error) {
        console.error("Remove Wishlist Error:", error);
        res.status(500).json({ message: "Error removing from wishlist" });
    }
};

// 🔁 Toggle Wishlist (Add or Remove)
export const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId)
            return res.status(400).json({ message: "Product ID is required" });

        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.id, products: [productId] });
            await wishlist.save();
            return res.status(200).json({
                success: true,
                message: "Added to wishlist",
                wishlist,
            });
        }

        const exists = wishlist.products.some(
            (id) => id.toString() === productId.toString()
        );

        if (exists) {
            wishlist.products = wishlist.products.filter(
                (id) => id.toString() !== productId.toString()
            );
            await wishlist.save();
            return res.status(200).json({
                success: true,
                message: "Removed from wishlist",
                wishlist,
            });
        } else {
            wishlist.products.push(productId);
            await wishlist.save();
            return res.status(200).json({
                success: true,
                message: "Added to wishlist",
                wishlist,
            });
        }
    } catch (error) {
        console.error("Toggle Wishlist Error:", error);
        res.status(500).json({ message: "Error toggling wishlist" });
    }
};
