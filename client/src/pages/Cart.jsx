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
    const [selectedItems, setSelectedItems] = useState(new Set());
    const navigate = useNavigate();

    // Update selection when cart items load
    useEffect(() => {
        if (cartItems.length > 0) {
            const allIds = new Set(cartItems.map(item => item.product._id));
            setSelectedItems(allIds);
        }
    }, [cartItems]);

    const toggleSelection = (productId) => {
        const newSelection = new Set(selectedItems);
        if (newSelection.has(productId)) {
            newSelection.delete(productId);
        } else {
            newSelection.add(productId);
        }
        setSelectedItems(newSelection);
    };

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

    const removeItem = async (productId) => {
        try {
            const { data } = await axios.delete(`/api/users/${user._id}/cart/${productId}`);
            setCartItems(data);
            const newCount = data.reduce((acc, item) => acc + item.quantity, 0);
            updateCartCount(newCount);
            alert('Item removed');
        } catch (error) {
            console.error("Failed to remove item", error);
            alert('Failed to remove item');
        }
    };

    const checkout = () => {
        if (selectedItems.size === 0) {
            alert("Please select at least one item to checkout");
            return;
        }

        const itemsToCheckout = cartItems.filter(item => selectedItems.has(item.product._id));

        navigate('/checkout', {
            state: {
                items: itemsToCheckout,
                source: 'cart'
            }
        });
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
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.has(item.product._id)}
                                        onChange={() => toggleSelection(item.product._id)}
                                        style={{ transform: 'scale(1.5)', cursor: 'pointer' }}
                                    />
                                </div>
                                {item.product ? (
                                    <>
                                        <img src={item.product.image} alt={item.product.title} width="80" />
                                        <div className="item-details">
                                            <h3>{item.product.title}</h3>
                                            <p>Rs. {item.product.price}</p>
                                            <p>Qty: {item.quantity}</p>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeItem(item.product._id)}
                                                style={{
                                                    background: '#ff4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    marginTop: '10px',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p>Product Removed</p>
                                )}
                            </div>
                        ))}

                        <div className="cart-summary">
                            <h3>
                                Total: Rs. {cartItems
                                    .filter(item => selectedItems.has(item.product?._id))
                                    .reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0)
                                    .toLocaleString()}
                            </h3>
                            <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                                ({selectedItems.size} items selected)
                            </p>
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
