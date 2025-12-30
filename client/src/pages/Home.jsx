import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';
import { Link } from 'react-router-dom';

import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const { data } = await axios.get('/api/products/random'); // Or /api/products for now if random not fully working
                setRandomProducts(data);
            } catch (error) {
                console.error('Error fetching products', error);
                // Fallback dummy data if API fails or backend not up
                setRandomProducts([
                    { _id: '1', title: 'Dummy Product 1', price: 100, image: 'https://via.placeholder.com/150', rating: 4 },
                    { _id: '2', title: 'Dummy Product 2', price: 200, image: 'https://via.placeholder.com/150', rating: 5 },
                    { _id: '3', title: 'Dummy Product 3', price: 300, image: 'https://via.placeholder.com/150', rating: 3 },
                ]);
            }
        };
        fetchRandomProducts();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />
            <div className="home-container">
                <div className="hero-section">
                    <Sidebar />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <HeroCarousel />
                    </div>
                </div>

                <div className="random-products">
                    <h2>Just For You</h2>
                    <div className="product-grid">
                        {randomProducts.map(product => (
                            <div key={product._id} className="product-card">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        onError={(e) => { e.target.src = 'https://placehold.co/400?text=Product+Image'; }}
                                    />
                                    <div className="product-info">
                                        <p className="product-title">{product.title}</p>
                                        <p className="product-price">Rs. {product.price}</p>
                                        <p className="product-rating">Rating: {product.rating}/5</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="scroll-up-btn" onClick={scrollToTop}>
                    <FaArrowUp />
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Home;
