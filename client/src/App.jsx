import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';

import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    <div className="app">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/products" element={<Search />} />
                        </Routes>
                    </div>
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
