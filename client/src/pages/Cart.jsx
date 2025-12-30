import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Cart.css';

const Cart = () => {
    const { user } = useAuth();
    const { updateCartCount } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const { data } = await axios.get(`/api/users/${user._id}/cart`);
            setCartItems(data);
        } catch (error) {
            console.error("Failed to fetch cart");
        }
    };

    const checkout = async () => {
        // Create order simple version
        const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        const orderItems = cartItems.map(item => ({
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
                totalPrice
            });
            alert('Order Placed Successfully!');
            setCartItems([]);
            updateCartCount(0);
            navigate('/profile');
        } catch (error) {
            alert('Order failed');
        }
    };

    if (!user) return <> <Navbar /> <div className="cart-container">Please login to view cart</div> <Footer /> </>;

    return (
        <>
            <Navbar />
            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? <p>Your cart is empty</p> : (
                    <div className="cart-list">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                {item.product ? (
                                    <>
                                        <img src={item.product.image} alt={item.product.title} width="80" />
                                        <div className="item-details">
                                            <h3>{item.product.title}</h3>
                                            <p>Rs. {item.product.price}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                    </>
                                ) : (
                                    <p>Product Removed</p>
                                )}
                            </div>
                        ))}

                        <div className="cart-summary">
                            <h3>Total: Rs. {cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0)}</h3>
                            <button className="checkout-btn" onClick={checkout}>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
