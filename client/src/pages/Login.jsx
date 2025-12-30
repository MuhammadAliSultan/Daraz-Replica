import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const handleSocialLogin = (provider) => {
        window.open('https://' + provider + '.com', '_blank', 'width=500,height=600');
        alert(`Login with ${provider} clicked (Mock)`);
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Welcome ! Please login.</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group icon-input">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <FaEnvelope className="field-icon" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div className="form-group icon-input">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <FaLock className="field-icon" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        <button type="submit" className="auth-btn">LOGIN</button>
                    </form>
                    <div className="social-login">
                        <p>Or, login with</p>
                        <button className="social-btn fb" onClick={() => handleSocialLogin('facebook')}>
                            <FaFacebook /> Facebook
                        </button>
                        <button className="social-btn google" onClick={() => handleSocialLogin('google')}>
                            <FaGoogle /> Google
                        </button>
                    </div>
                    <div className="auth-footer">
                        New member? <Link to="/signup">Register here.</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
