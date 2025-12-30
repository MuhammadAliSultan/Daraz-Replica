import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css'; // Reusing Home styles for grid

const Search = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            let query = '';
            if (keyword) query = `?keyword=${keyword}`;
            if (category) query = `?category=${category}`; // Backend might need adjustment for category logic strictly if not keyword, or just filter
            // My backend currently only handles keyword. Ideally update backend to handle category too, or just mock it by keywords for now.
            // I'll stick to 'keyword' being passed. If category is passed, I'll allow searching by string.
            // But categories in Sidebar are specific strings.

            try {
                const params = new URLSearchParams();
                if (keyword) params.append('keyword', keyword);
                if (category) params.append('category', category);

                const { data } = await axios.get(`/api/products?${params.toString()}`);
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, [keyword, category]);

    return (
        <>
            <Navbar />
            <div className="home-container">
                <button
                    onClick={() => window.history.back()}
                    style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer', border: '1px solid #ccc', background: '#fff' }}
                >
                    &larr; Back
                </button>
                <h2>Results for "{keyword || category}"</h2>
                <div className="product-grid">
                    {products.length > 0 ? products.map(product => (
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
                                </div>
                            </Link>
                        </div>
                    )) : <p>No products found.</p>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Search;
