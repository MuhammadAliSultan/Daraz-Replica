const User = require('../models/User');

const getUserProfile = async (req, res) => {
    // Assuming req.user is set by auth middleware (which I need to create)
    // For now, accept ID in params or body for testing without middleware, OR implement middleware
    // I will implement basic middleware later. For now, using ID from body for simplicity or header
    try {
        const user = await User.findById(req.params.id); // In real app: req.user._id
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }
        await user.save();
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('cart.product');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Filter out items where product is null (deleted products)
        const activeCartItems = user.cart.filter(item => item.product !== null);

        // Optionally save the cleaned cart back to DB to permanently remove them
        if (activeCartItems.length !== user.cart.length) {
            user.cart = activeCartItems;
            await user.save();
        }

        res.json(activeCartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { id, productId } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.cart = user.cart.filter(item => item.product && item.product.toString() !== productId);
        await user.save();

        // Return updated cart with populated products
        const updatedUser = await User.findById(id).populate('cart.product');
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getUserProfile, addToCart, getCart, removeFromCart };
