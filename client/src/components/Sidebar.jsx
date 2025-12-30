import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaMobileAlt, FaHeadphones, FaTv, FaLeaf, FaBaby,
    FaCarrot, FaHome, FaFemale, FaMale, FaGem, FaChevronRight
} from 'react-icons/fa';
import './Sidebar.css';

const CATEGORIES = [
    { name: 'Electronic Devices', icon: <FaMobileAlt /> },
    { name: 'Electronic Accessories', icon: <FaHeadphones /> },
    { name: 'TV & Home Appliances', icon: <FaTv /> },
    { name: 'Health & Beauty', icon: <FaLeaf /> },
    { name: 'Babies & Toys', icon: <FaBaby /> },
    { name: 'Groceries & Pets', icon: <FaCarrot /> },
    { name: 'Home & Lifestyle', icon: <FaHome /> },
    { name: 'Women\'s Fashion', icon: <FaFemale /> },
    { name: 'Men\'s Fashion', icon: <FaMale /> },
    { name: 'Watches, Bags & Jewelery', icon: <FaGem /> }
];

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                {CATEGORIES.map((cat, index) => (
                    <li key={index}>
                        <Link to={`/products?category=${encodeURIComponent(cat.name)}`}>
                            <span className="cat-icon">{cat.icon}</span>
                            <span className="cat-name">{cat.name}</span>
                            <span className="cat-arrow"><FaChevronRight /></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
