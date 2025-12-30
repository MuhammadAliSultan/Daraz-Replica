import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserCircle, FaBoxOpen, FaClipboardList, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`/api/orders/${user._id}`);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders');
        }
    };

    if (!user) return <div>Please login.</div>;

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="user-card">
                        <FaUserCircle className="user-avatar" />
                        <h3>{user.fullName}</h3>
                    </div>
                    <div className="profile-details">
                        <p><FaEnvelope /> {user.email}</p>
                        <p><FaCalendarAlt /> Member since {new Date(user.createdAt || Date.now()).getFullYear()}</p>
                    </div>
                </div>

                <div className="profile-content">
                    <h2><FaClipboardList /> My Orders</h2>
                    {orders.length === 0 ? (
                        <div className="no-orders">
                            <FaBoxOpen className="empty-icon" />
                            <p>No orders yet. Start shopping!</p>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <div className="order-id">
                                            <span>Order #{order._id.substring(0, 8)}...</span>
                                        </div>
                                        <div className="order-meta">
                                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="order-total">Rs. {order.totalPrice.toLocaleString()}</span>
                                            <span className={`order-status ${order.isDelivered ? 'delivered' : 'processing'}`}>
                                                {order.isDelivered ? 'Delivered' : 'Processing'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="order-items">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="order-item-preview">
                                                <img src={item.image} alt={item.title} />
                                                <div className="item-info">
                                                    <span className="item-title">{item.title}</span>
                                                    <span className="item-qty">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
