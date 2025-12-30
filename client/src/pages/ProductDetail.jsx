import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaStar, FaShoppingCart, FaCreditCard, FaShieldAlt, FaTruck } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { updateCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product');
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post('/api/users/cart', {
                userId: user._id,
                productId: product._id,
                quantity
            });
            // Update global cart count
            const newCount = data.cart.products.reduce((acc, item) => acc + item.quantity, 0);
            updateCartCount(newCount);

            addToast(`Added ${quantity} ${product.title}(s) to cart!`, 'success');
        } catch (error) {
            addToast('Error adding to cart', 'error');
        } finally {
            setLoading(false);
        }
    };

    const buyNow = async () => {
        await addToCart();
        navigate('/cart');
    };

    if (!product) return <div>Loading...</div>;

    return (
        <>
            < Navbar />
            <div className="product-detail-container">
                <button
                    onClick={() => window.history.back()}
                    style={{ position: 'absolute', top: '90px', left: '20px', padding: '8px 15px', cursor: 'pointer', zIndex: 100 }}
                >
                    &larr; Back
                </button>
                <div className="product-image">
                    <img
                        src={product.image}
                        alt={product.title}
                        onError={(e) => { e.target.src = 'https://placehold.co/400?text=Product+Image'; }}
                    />
                </div>
                <div className="product-main-info">
                    <h1>{product.title}</h1>
                    <div className="rating">
                        <span><FaStar className="star-icon" /> {product.rating} / 5.0</span>
                        <span className="divider">|</span>
                        <span>Brand: <strong>{product.brand || 'No Brand'}</strong></span>
                    </div>

                    <div className="price-section">
                        <span className="current-price">Rs. {product.price.toLocaleString()}</span>
                    </div>

                    <div className="delivery-info">
                        <p><FaTruck /> Standard Delivery <span className="free-badge">Get by {new Date(Date.now() + 86400000 * 3).toLocaleDateString()}</span></p>
                        <p><FaShieldAlt /> 100% Authentic Product</p>
                    </div>

                    <div className="product-description" style={{ marginTop: '20px', marginBottom: '20px', color: '#555', lineHeight: '1.6' }}>
                        <h3>Product Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="quantity-selector">
                        <label>Quantity:</label>
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>

                    <div className="action-buttons">
                        <button className="buy-now" onClick={buyNow} disabled={loading}><FaCreditCard /> Buy Now</button>
                        <button className="add-cart" onClick={addToCart} disabled={loading}>
                            {loading ? 'Adding...' : <><FaShoppingCart /> Add to Cart</>}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
