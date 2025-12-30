import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', background: 'white' }}>
                <h1>About Daraz Replica</h1>
                <p>Welcome to Daraz Replica, your number one source for all things. We're dedicated to giving you the very best of products, with a focus on dependability, customer service, and uniqueness.</p>
                <p>Founded in {new Date().getFullYear()}, Daraz Replica has come a long way from its beginnings. When we first started out, our passion for eco-friendly cleaning products drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online store.</p>
                <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
            </div>
            <Footer />
        </>
    );
};

export default About;
