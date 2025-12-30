import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';
import './Footer.css';
import codIcon from '../assets/payment/cod.png';
import easypaisaIcon from '../assets/payment/easypasia.jpeg';
import jazzcashIcon from '../assets/payment/jazzcash.jpeg';
import mastercardIcon from '../assets/payment/mastercard.png';
import visaIcon from '../assets/payment/visa.png';
import pciIcon from '../assets/payment/pci pss.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Customer Care</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">How to Buy</a></li>
                        <li><a href="#">Returns & Refunds</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">CCMS - Central Complain Management System</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Daraz</h3>
                    <ul>
                        <li><a href="#">About Daraz</a></li>
                        <li><a href="#">Digital Payments</a></li>
                        <li><a href="#">Daraz Cares</a></li>
                        <li><a href="#">Daraz Blog</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">NTN Number : 4012118-6</a></li>
                        <li><a href="#">STRN Number : 1700401211818</a></li>
                        <li><a href="#">Online Shopping App</a></li>
                        <li><a href="#">Daraz Exclusive</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>International</h3>
                    <ul>
                        <li><a href="#"><FaGlobe /> Pakistan</a></li>
                        <li><a href="#"><FaGlobe /> Bangladesh</a></li>
                        <li><a href="#"><FaGlobe /> Sri Lanka</a></li>
                        <li><a href="#"><FaGlobe /> Myanmar</a></li>
                        <li><a href="#"><FaGlobe /> Nepal</a></li>
                    </ul>

                    <h3 style={{ marginTop: '20px' }}>Payment Methods</h3>
                    <div className="payment-icons">
                        <img src={codIcon} alt="Cash on Delivery" style={{ height: '30px', marginRight: '10px' }} />
                        <img src={visaIcon} alt="Visa" style={{ height: '30px', marginRight: '10px' }} />
                        <img src={mastercardIcon} alt="Mastercard" style={{ height: '30px', marginRight: '10px' }} />
                        <img src={easypaisaIcon} alt="Easypaisa" style={{ height: '30px', marginRight: '10px' }} />
                        <img src={jazzcashIcon} alt="JazzCash" style={{ height: '30px' }} />
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://www.facebook.com/darazpk" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com/darazpk" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://www.instagram.com/darazpk/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.youtube.com/c/DarazPk" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        <a href="https://blog.daraz.pk/" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
                    </div>

                    <h3 style={{ marginTop: '20px' }}>Verified by</h3>
                    <div className="verified-icons">
                        <img src={pciIcon} alt="PCI Compliant" style={{ height: '40px' }} />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Daraz Replica. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
