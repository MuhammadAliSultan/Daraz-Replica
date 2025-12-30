require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const verifyData = async () => {
    try {
        await connectDB();
        const count = await Product.countDocuments();
        console.log(`Total Products in DB: ${count}`);

        if (count > 0) {
            const sample = await Product.findOne();
            console.log('Sample Product:', JSON.stringify(sample, null, 2));
        }

        process.exit();
    } catch (error) {
        console.error('Verification Error:', error.message);
        process.exit(1);
    }
};

verifyData();
