'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.scss';

const Services = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const services = [
        {
            title: "Micro Tunneling",
            description: "Precise underground construction for small diameter pipes with advanced technology and minimal environmental impact.",
            icon: "🚇",
            features: ["Precision Control", "Small Footprint", "Cost-Effective"],
            gradient: "from-blue-400 to-cyan-300"
        },
        {
            title: "Horizontal Directional Drilling",
            description: "State-of-the-art drilling technology for utility installation with minimal surface disruption.",
            icon: "⚡",
            features: ["Non-invasive", "Rapid Installation", "Versatile Application"],
            gradient: "from-purple-400 to-pink-300"
        },
        {
            title: "Tunnel Boring",
            description: "Large-scale tunnel construction using cutting-edge boring machines and expert engineering.",
            icon: "🏗️",
            features: ["High Capacity", "Safety Focused", "Efficient Process"],
            gradient: "from-emerald-400 to-teal-300"
        }
    ];

    return (
        <section className="services-section">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="services-background"
            />
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Our Tunneling Services
            </motion.h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        className={`service-card ${service.gradient}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        onHoverStart={() => setHoveredId(index)}
                        onHoverEnd={() => setHoveredId(null)}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card-content">
                            <motion.div 
                                className="icon-wrapper"
                                animate={{ 
                                    rotate: hoveredId === index ? 360 : 0,
                                    scale: hoveredId === index ? 1.2 : 1
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="icon">{service.icon}</span>
                            </motion.div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="features-list">
                                {service.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                    >
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
