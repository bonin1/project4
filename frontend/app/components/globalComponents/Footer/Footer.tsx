'use client';

import Image from 'next/image';
import Link from 'next/link';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-section brand-section">
                            <Link href="/" className="footer-logo">
                                <Image
                                    src="/4564931.png"
                                    alt="Company Logo"
                                    width={180}
                                    height={60}
                                    priority
                                />
                            </Link>
                            <p className="footer-description">
                                We are committed to delivering exceptional construction and renovation services,
                                backed by years of expertise and dedication to quality craftsmanship.
                            </p>
                            <div className="social-links">
                                <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                                <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h3>Navigation</h3>
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/services">Our Services</Link></li>
                                <li><Link href="/projects">Projects</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>Our Services</h3>
                            <ul>
                                <li><Link href="/services/construction">Construction</Link></li>
                                <li><Link href="/services/renovation">Renovation</Link></li>
                                <li><Link href="/services/architecture">Architecture</Link></li>
                                <li><Link href="/services/interior">Interior Design</Link></li>
                                <li><Link href="/services/consultation">Consultation</Link></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>Contact Us</h3>
                            <ul className="contact-info">
                                <li>
                                    <i className="bi bi-geo-alt"></i>
                                    <span>123 Main Str<br/>Kodrali City, Kosovo</span>
                                </li>
                                <li>
                                    <i className="bi bi-telephone"></i>
                                    <span>+383 49 100 100</span>
                                </li>
                                <li>
                                    <i className="bi bi-envelope"></i>
                                    <span>contact@best2.com</span>
                                </li>
                                <li>
                                    <i className="bi bi-clock"></i>
                                    <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
                                </li>
                            </ul>
                        </div>
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
