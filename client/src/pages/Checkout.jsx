import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Cart.css'; // Reusing Cartesian styles for consistency

const Checkout = () => {
    const { state } = useLocation();
    const { user } = useAuth();
    const { updateCartCount } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Items to purchase
    const checkoutItems = state?.items || [];
    const source = state?.source || 'direct'; // 'cart' or 'direct'

    const totalPrice = checkoutItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (checkoutItems.length === 0) {
            navigate('/');
        }
    }, [user, checkoutItems, navigate]);

    const handleConfirmOrder = async () => {
        setLoading(true);
        // Format items for backend: needs product (ID), title, price, image, quantity
        const orderItems = checkoutItems.map(item => ({
            product: item.product._id,
            title: item.product.title,
            quantity: item.quantity,
            image: item.product.image,
            price: item.product.price
        }));

        try {
            await axios.post('/api/orders', {
                user: user._id,
                orderItems,
                totalPrice,
                isCartCheckout: source === 'cart' // Flag to tell server whether to clear cart
            });

            alert('Order Placed Successfully!');

            if (source === 'cart') {
                updateCartCount(0); // Update frontend badge immediately
            }

            navigate('/profile');
        } catch (error) {
            console.error(error);
            alert('Order failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user || checkoutItems.length === 0) return null;

    return (
        <>
            <Navbar />
            <div className="cart-container">
                <h2>Checkout Summary</h2>
                <div className="cart-list">
                    {checkoutItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.product.image} alt={item.product.title} width="80" />
                            <div className="item-details">
                                <h3>{item.product.title}</h3>
                                <p>Rs. {item.product.price.toLocaleString()}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Subtotal: Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <h3>Total Amount: Rs. {totalPrice.toLocaleString()}</h3>
                        <p style={{ marginBottom: '20px', color: '#555' }}>
                            Payment Method: <strong>Cash on Delivery</strong> (Default)
                        </p>
                        <button
                            className="checkout-btn"
                            onClick={handleConfirmOrder}
                            disabled={loading}
                            style={{ opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Processing...' : 'CONFIRM ORDER'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
