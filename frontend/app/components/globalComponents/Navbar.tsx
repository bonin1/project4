'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.scss';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link href="/" className="navbar-brand">
                    <img src="/4564931.png" alt="Main Logo" />
                </Link>

                <button 
                    className={`navbar-toggler ${isMenuOpen ? 'open' : ''}`}
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>Projects</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdown" 
                                role="button" 
                                data-bs-toggle="dropdown"
                            >
                                Contact
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="mailto:example@example.com">
                                        <i className="fas fa-envelope"></i>
                                        Email
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="tel:000000000">
                                        <i className="fas fa-phone"></i>
                                        Number
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-location-dot"></i>
                                        Location
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
