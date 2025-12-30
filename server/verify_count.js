require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const check = async () => {
    try {
        await connectDB();
        const count = await Product.countDocuments();
        console.log(`FINAL_COUNT: ${count}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
check();
