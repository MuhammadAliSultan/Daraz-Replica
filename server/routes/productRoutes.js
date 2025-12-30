const express = require('express');
const router = express.Router();
const { getProducts, getRandomProducts, getProductById, createProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/random', getRandomProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // For adding products initially

module.exports = router;
