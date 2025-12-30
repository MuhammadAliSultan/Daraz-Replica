import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HeroCarousel.css';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop",
            title: "Mega Flash Sale",
            subtitle: "Up to 70% Off Electronics",
            link: "/products?category=Electronic%20Devices",
            color: "#f85606"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
            title: "New Arrivals",
            subtitle: "Explore Top Fashion Trends",
            link: "/products?category=Women's%20Fashion",
            color: "#2196f3"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
            title: "Beauty Bonanza",
            subtitle: "Skincare Essentials & More",
            link: "/products?category=Health%20&%20Beauty",
            color: "#e91e63"
        }
    ];

    return (
        <div className="hero-carousel-container">
            <Slider {...settings}>
                {slides.map(slide => (
                    <div key={slide.id} className="hero-slide-wrapper">
                        <Link to={slide.link} className="hero-slide-link">
                            <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }}>
                                <div className="hero-overlay"></div>
                                <div className="hero-content">
                                    <h3>{slide.subtitle}</h3>
                                    <h2 style={{ color: slide.color }}>{slide.title}</h2>
                                    <button className="shop-now-btn" style={{ background: slide.color }}>Shop Now</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroCarousel;
