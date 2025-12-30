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
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getUserProfile, addToCart, getCart };
