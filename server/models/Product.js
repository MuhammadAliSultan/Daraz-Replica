const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    quantity: { type: Number, default: 10 },
    brand: { type: String },
    description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
