'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHome, FaTools, FaPaintBrush, FaCheck } from 'react-icons/fa';
import './serviceDetails.scss';

const ServiceDetails = () => {
    const { scrollYProgress } = useScroll();
    
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1], 
        [0.9, 1.05, 0.95] 
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.8, 1, 1, 0.8]
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="service-details py-5">
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            <div className="container">
                <motion.div 
                    className="content"
                    style={{ 
                        scale,
                        opacity
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div 
                        className="text-center mb-5"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="display-4 fw-bold">Professional Renovation Services</h2>
                        <p className="lead text-muted">
                            Transform your space with our expert renovation services
                        </p>
                    </motion.div>

                    <div className="row g-4">
                        {[
                            {
                                icon: <FaHome className="service-icon" />,
                                title: "Interior Renovation",
                                features: [
                                    "Kitchen remodeling",
                                    "Bathroom renovations",
                                    "Living space makeovers",
                                    "Custom cabinetry",
                                    "Flooring installation"
                                ]
                            },
                            {
                                icon: <FaTools className="service-icon" />,
                                title: "Structural Updates",
                                features: [
                                    "Load-bearing wall modifications",
                                    "Foundation repairs",
                                    "Room additions",
                                    "Beam installations",
                                    "Structural assessments"
                                ]
                            },
                            {
                                icon: <FaPaintBrush className="service-icon" />,
                                title: "Modern Designs",
                                features: [
                                    "3D visualization",
                                    "Space planning",
                                    "Color consultation",
                                    "Material selection",
                                    "Smart home integration"
                                ]
                            }
                        ].map((service, index) => (
                            <motion.div 
                                className="col-md-4" 
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <motion.div 
                                    className="card h-100 service-card"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="card-body p-4">
                                        <div className="icon-wrapper mb-3">
                                            {service.icon}
                                        </div>
                                        <h3 className="card-title h4 text-center">{service.title}</h3>
                                        <div className="service-content">
                                            <p className="card-text">Our {service.title.toLowerCase()} services include:</p>
                                            <ul className="feature-list">
                                                {service.features.map((feature, i) => (
                                                    <li key={i}><FaCheck className="check-icon" /> {feature}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-3">We use premium materials and work with experienced craftsmen to ensure the highest quality finish for your home.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetails;
