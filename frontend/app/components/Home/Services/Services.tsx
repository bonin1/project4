'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './Services.scss';

const Services = () => {
    const router = useRouter();
    const services = [
        {
            icon: 'bi bi-buildings',
            title: 'Construction Excellence',
            description: 'Delivering world-class construction management with precision and innovation.',
            gradient: 'gradient-1',
            stats: { projects: '200+', experience: '15+ Years' },
            path: '/construction'
        },
        {
            icon: 'bi bi-house-check',
            title: 'Modern Renovation',
            description: 'Transforming spaces with cutting-edge renovation solutions and superior craftsmanship.',
            gradient: 'gradient-2',
            stats: { clients: '500+', satisfaction: '98%' },
            path: '/renovation'
        },
        {
            icon: 'bi bi-boxes',
            title: 'Architectural Innovation',
            description: 'Creating sustainable and visionary architectural designs for tomorrow.',
            gradient: 'gradient-3',
            stats: { awards: '25+', certified: '100%' },
            path: '/architecture'
        },
        {
            icon: 'bi bi-gear-wide-connected',
            title: 'Smart Maintenance',
            description: 'Proactive maintenance solutions using IoT and predictive analytics.',
            gradient: 'gradient-4',
            stats: { uptime: '99.9%', response: '24/7' },
            path: '/maintenance'
        },
        {
            icon: 'bi bi-moisture',
            title: 'Tunneling Solutions',
            description: 'Advanced tunneling and underground construction expertise using state-of-the-art boring technology.',
            gradient: 'gradient-4',
            stats: { depth: '500m+', length: '25km+' },
            path: '/tunneling'
        },
        {
            icon: 'bi bi-tree',
            title: 'Sustainable Development',
            description: 'Eco-friendly construction practices and sustainable infrastructure solutions for a greener future.',
            gradient: 'gradient-4',
            stats: { green: 'LEED', carbon: 'Net-Zero' },
            path: '/sustainability'
        }
    ];

    return (
        <section className="services-section">
            <div className="container">
                <div className="section-header">
                    <span className="pre-title">Our Expertise</span>
                    <h2>Comprehensive Construction Solutions</h2>
                    <p className="section-description">
                        Leveraging cutting-edge technology and decades of experience to deliver 
                        exceptional construction services that exceed expectations.
                    </p>
                </div>
                
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className={`service-card ${service.gradient}`}>
                            <div className="card-content">
                                <div className="icon-wrapper">
                                    <i className={service.icon}></i>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                
                                <div className="service-stats">
                                    {Object.entries(service.stats).map(([key, value]) => (
                                        <div key={key} className="stat-item">
                                            <span className="stat-value">{value}</span>
                                            <span className="stat-label">{key}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="explore-btn" onClick={() => router.push(service.path)}>
                                    <div className="button-content">
                                        <span>Explore {service.title}</span>
                                        <div className="button-decoration"></div>
                                    </div>
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
