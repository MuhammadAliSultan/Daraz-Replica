import React, { useState, useEffect } from 'react';
import './AdTicker.css';

const ADS = [
    { id: 1, image: 'https://via.placeholder.com/800x300?text=Ad+1', link: '/ad1' },
    { id: 2, image: 'https://via.placeholder.com/800x300?text=Ad+2', link: '/ad2' },
    { id: 3, image: 'https://via.placeholder.com/800x300?text=Ad+3', link: '/ad3' },
    { id: 4, image: 'https://via.placeholder.com/800x300?text=Ad+4', link: '/ad4' },
    { id: 5, image: 'https://via.placeholder.com/800x300?text=Ad+5', link: '/ad5' },
    { id: 6, image: 'https://via.placeholder.com/800x300?text=Ad+6', link: '/ad6' },
    { id: 7, image: 'https://via.placeholder.com/800x300?text=Ad+7', link: '/ad7' },
    { id: 8, image: 'https://via.placeholder.com/800x300?text=Ad+8', link: '/ad8' },
    { id: 9, image: 'https://via.placeholder.com/800x300?text=Ad+9', link: '/ad9' },
    { id: 10, image: 'https://via.placeholder.com/800x300?text=Ad+10', link: '/ad10' },
];

const AdTicker = () => {
    const [currentAd, setCurrentAd] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAd((prev) => (prev + 1) % ADS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="ad-ticker">
            <div className="ad-slide">
                <a href={ADS[currentAd].link}>
                    <img src={ADS[currentAd].image} alt={`Ad ${currentAd + 1}`} />
                </a>
            </div>
            <div className="ad-dots">
                {ADS.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentAd ? 'active' : ''}`}
                        onClick={() => setCurrentAd(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default AdTicker;
