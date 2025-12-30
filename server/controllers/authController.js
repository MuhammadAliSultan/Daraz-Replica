const User = require('../models/User');


const registerUser = async (req, res) => {
    try {
        const { fullName, phone, email, password, birthday, gender } = req.body;

        // Strict Validation
        if (!fullName || !phone || !email || !password || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 6 chars with letters and numbers' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            fullName,
            phone,
            email,
            password, // In real app: bcrypt.hashSync(password, 10)
            birthday,
            gender
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: 'dummy_token_for_now' // Implement JWT later if needed
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.password === password) { // In real app: bcrypt.compareSync
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: 'dummy_token_for_now'
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
