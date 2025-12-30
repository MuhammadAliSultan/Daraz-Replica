import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Daraz Replica</Link>
            </div>
            <form className="navbar-search" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search in Daraz"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit"><FaSearch /></button>
            </form>
            <div className="navbar-links">
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {user ? (
                    <>
                        <Link to="/profile">Hi, {user.fullName}</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
                <Link to="/cart" className="cart-link" style={{ position: 'relative' }}>
                    <FaShoppingCart /> View Cart
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-10px',
                            background: '#f85606',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                        }}>
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
