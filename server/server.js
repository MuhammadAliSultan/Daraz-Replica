require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');

// Routes
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        // Exclude API routes from this catch-all
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
        }
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
