const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Min 6 chars check in controller/validation
    birthday: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
