import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        phone: '',
        fullName: '',
        email: '', // Not explicitly asked in list but usually needed for login, added for completeness or can use phone as login
        password: '',
        birthday: '',
        gender: '',
    });
    const [sliderMoved, setSliderMoved] = useState(false); // SMS Code Slider simulation
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSliderChange = (e) => {
        if (e.target.value > 90) {
            setSliderMoved(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation handled in backend to some extent, but Frontend check:
        if (!sliderMoved) {
            setError('Please slide to verify SMS code (simulation)');
            return;
        }
        if (formData.password.length < 6 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
            setError('Password must be at least 6 chars with number/letter');
            return;
        }

        try {
            await signup(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Create your Daraz Account</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="fullName" onChange={handleChange} required placeholder="Enter your first and last name" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" onChange={handleChange} required placeholder="Please enter your phone number" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" onChange={handleChange} required placeholder="Please enter your email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" onChange={handleChange} required placeholder="Minimum 6 characters with number and letter" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="date" name="birthday" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group sms-slider">
                            <label>SMS Code (Slide to verify)</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                defaultValue="0"
                                onChange={handleSliderChange}
                                disabled={sliderMoved}
                            />
                            {sliderMoved && <span className="verified">Verified!</span>}
                        </div>

                        <button type="submit" className="auth-btn">SIGN UP</button>
                    </form>
                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here.</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Signup;
