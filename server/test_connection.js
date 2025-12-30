require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
    console.log('--- STARTING CONNECTION TEST ---');
    console.log('URI:', process.env.MONGO_URI ? 'Defined' : 'UNDEFINED');

    try {
        // Set a short timeout (5000ms) to fail fast if IP is blocked
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            dbName: 'daraz_replica'
        });
        console.log('SUCCESS: Connected to MongoDB!');
        console.log(`Database Name: ${mongoose.connection.name}`);
        process.exit(0);
    } catch (error) {
        console.error('FAILURE: Could not connect.');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        process.exit(1);
    }
};

testConnection();
