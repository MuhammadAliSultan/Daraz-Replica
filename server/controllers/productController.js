const Product = require('../models/Product');

// Get all products with search and category filter
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // Exact match for category if provided
        const categoryQuery = req.query.category
            ? { category: req.query.category }
            : {};

        // Combine queries (AND logic)
        const products = await Product.find({ ...keyword, ...categoryQuery });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Random Products (for home page)
const getRandomProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        // If we have few products, just return all
        if (count <= 10) {
            const products = await Product.find({});
            return res.json(products);
        }
        const products = await Product.aggregate([{ $sample: { size: 18 } }]);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, price, image, category, brand, quantity, rating } = req.body;
        const product = new Product({ title, price, image, category, brand, quantity, rating });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProducts, getRandomProducts, getProductById, createProduct };
