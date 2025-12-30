import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', background: 'white' }}>
                <h1>Contact Us</h1>
                <p>Have questions? We're here to help.</p>
                <div style={{ marginTop: '20px' }}>
                    <h3>Customer Service</h3>
                    <p>Email: support@darazreplica.com</p>
                    <p>Phone: +92 123 456 7890</p>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <h3>Head Office</h3>
                    <p>123 Commerce St, Tech City, Pakistan</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
