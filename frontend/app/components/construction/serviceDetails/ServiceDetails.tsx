'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './ServiceDetails.scss';

const ServiceDetails = () => {
    const services = [
        {
            title: "Commercial Construction",
            description: "State-of-the-art commercial buildings with modern amenities and sustainable features.",
            features: ["Custom Design", "Energy Efficient", "Smart Integration", "Sustainable Materials"],
            image: "/construction-site.jpg",
            icon: "bi-building"
        },
        {
            title: "Residential Development",
            description: "Premium residential complexes that blend comfort with contemporary design.",
            features: ["Quality Craftsmanship", "Modern Aesthetics", "Timely Delivery", "Cost Effective"],
            image: "/construction-site.jpg",
            icon: "bi-house-heart"
        }
    ];

    return (
        <section className="services-section">
            
            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="service-card"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="service-image">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="service-content">
                            <i className={`bi ${service.icon}`}></i>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="features-list">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="feature-item">
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServiceDetails;
