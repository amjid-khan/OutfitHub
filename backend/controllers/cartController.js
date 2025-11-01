import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/**
 * 🛒 Add product to cart
 */
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware
        const { productId, quantity } = req.body;

        // ✅ Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // ✅ Find existing cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // if no cart, create a new one
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: quantity || 1 }],
            });
        } else {
            // if cart exists, check if product already exists
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity || 1;
            } else {
                cart.items.push({ product: productId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({
            message: "✅ Product added to cart successfully",
            cart: cart.items,
        });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ message: "❌ Server error adding to cart", error });
    }
};

/**
 * 📦 Get all items in user's cart
 */
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        // ✅ Always return `cart` array for frontend consistency
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ cart: [] });
        }

        res.status(200).json({ cart: cart.items });
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ message: "❌ Server error fetching cart", error });
    }
};

/**
 * ❌ Remove item from cart
 */
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );
        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({
            message: "🗑️ Item removed from cart",
            cart: cart.items,
        });
    } catch (error) {
        console.error("Remove Cart Error:", error);
        res.status(500).json({ message: "❌ Server error removing item", error });
    }
};

/**
 * 🔁 Update cart quantity
 */
export const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(
            (i) => i.product.toString() === productId
        );
        if (!item) return res.status(404).json({ message: "Product not in cart" });

        item.quantity = quantity;
        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({
            message: "🔄 Quantity updated",
            cart: cart.items,
        });
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "❌ Server error updating cart", error });
    }
};
