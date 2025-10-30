import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ➤ Add product to cart
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
            // if no cart, create new one
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: quantity || 1 }],
            });
        } else {
            // if cart exists, check if product already in cart
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
        res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// ➤ Get all items in user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.status(200).json({ items: [] });
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// ➤ Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
