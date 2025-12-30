const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        // userId, orderItems, totalPrice
        const { user, orderItems, totalPrice } = req.body;
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user,
            orderItems,
            totalPrice
        });

        const createdOrder = await order.save();

        // Clear user's cart
        const userDoc = await User.findById(user);
        if (userDoc) {
            userDoc.cart = [];
            await userDoc.save();
        }

        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createOrder, getMyOrders };
