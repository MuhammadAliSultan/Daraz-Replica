const express = require('express');
const router = express.Router();
const { getUserProfile, addToCart, getCart } = require('../controllers/userController');
const { createOrder, getMyOrders } = require('../controllers/orderController');

// User Routes
router.get('/:id', getUserProfile);
router.post('/cart', addToCart);
router.get('/:id/cart', getCart);

// Order Routes (Merging here for simplicity or separate? Let's keep in one file for "user-centric" routes or separate?)
// The server.js has app.use('/api/users', ...). I will put order routes here under /:id/orders
router.post('/orders', createOrder); // If strictly RESTful, maybe POST /api/orders. I'll add a separate route file for orders to be clean.

// But wait, I'll export router for users primarily.
// Let's create a separate orderRoutes.js
module.exports = router;
