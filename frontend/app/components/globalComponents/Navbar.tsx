'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.scss';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const closeMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.navbar') && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [isMenuOpen]);

    useEffect(() => {
        setIsMenuOpen(false);
        setDropdownOpen(false);
    }, [pathname]);

    return (
        <nav className={`navbar navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container-navbar">
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

                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
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
                                className={`nav-link dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                                href="#" 
                                id="navbarDropdown" 
                                role="button" 
                                onClick={toggleDropdown}
                            >
                                Contact
                            </a>
                            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
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
