'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import './Footer.scss';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setEmail('');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 100 
            }
        }
    };

    return (
        <footer className="site-footer">
            
            <div className="footer-top">
                <div className="container">
                    <motion.div 
                        className="footer-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div className="footer-section brand-section" variants={itemVariants}>
                            <Link href="/" className="footer-logo">
                                <Image
                                    src="/4564931.png"
                                    alt="Company Logo"
                                    width={180}
                                    height={60}
                                    priority
                                    className="logo-image"
                                />
                            </Link>
                            <p className="footer-description">
                                We are committed to delivering exceptional construction and renovation services,
                                backed by years of expertise and dedication to quality craftsmanship.
                            </p>
                            <div className="newsletter-form">
                                <h4>Subscribe to our newsletter</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <input 
                                            type="email" 
                                            placeholder="Your email address" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                        <button type="submit" className="btn-subscribe">
                                            {isSubmitted ? 'Thanks!' : 'Subscribe'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        <motion.div className="footer-section" variants={itemVariants}>
                            <h3>Navigation</h3>
                            <ul className="footer-links">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/services">Our Services</Link></li>
                                <li><Link href="/projects">Projects</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div className="footer-section" variants={itemVariants}>
                            <h3>Our Services</h3>
                            <ul className="footer-links">
                                <li><Link href="/construction">Construction</Link></li>
                                <li><Link href="/services/renovation">Renovation</Link></li>
                                <li><Link href="/services/architecture">Architecture</Link></li>
                                <li><Link href="/services/interior">Interior Design</Link></li>
                                <li><Link href="/services/consultation">Consultation</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div className="footer-section contact-section" variants={itemVariants}>
                            <h3>Contact Us</h3>
                            <ul className="contact-info">
                                <li className="contact-item">
                                    <div className="icon-container">
                                        <i className="bi bi-geo-alt"></i>
                                    </div>
                                    <span>123 Main Str<br/>Kosovo</span>
                                </li>
                                <li className="contact-item">
                                    <div className="icon-container">
                                        <i className="bi bi-telephone"></i>
                                    </div>
                                    <span>+383 49 116 895</span>
                                </li>
                                <li className="contact-item">
                                    <div className="icon-container">
                                        <i className="bi bi-envelope"></i>
                                    </div>
                                    <span>info@tebotronic.com</span>
                                </li>
                                <li className="contact-item">
                                    <div className="icon-container">
                                        <i className="bi bi-clock"></i>
                                    </div>
                                    <span>Mon - Sun: 8:00 AM - 6:00 PM</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            
            <div className="social-bar">
                <div className="container">
                    <div className="social-wrapper">
                        <motion.div 
                            className="social-links"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="#" aria-label="Facebook" className="social-icon">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" aria-label="Twitter" className="social-icon">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="social-icon">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="#" aria-label="Instagram" className="social-icon">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Best 2. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
