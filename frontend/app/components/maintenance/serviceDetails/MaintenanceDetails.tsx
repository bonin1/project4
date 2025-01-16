'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MaintenanceDetails.scss';
import ContactModal from '../ContactModal/ContactModal';

const MaintenanceDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const techFeatures = [
        { icon: 'bi-cpu', title: 'IoT Integration', desc: 'Smart sensors and real-time monitoring' },
        { icon: 'bi-graph-up', title: 'Predictive Analytics', desc: 'AI-powered maintenance forecasting' },
        { icon: 'bi-cloud-check', title: 'Cloud Platform', desc: 'Centralized data management' },
        { icon: 'bi-shield-check', title: 'Smart Security', desc: 'Advanced system protection' }
    ];

    const maintenanceMetrics = [
        { value: '99.9%', label: 'Uptime', icon: 'bi-activity' },
        { value: '-45%', label: 'Maintenance Costs', icon: 'bi-currency-dollar' },
        { value: '24/7', label: 'Monitoring', icon: 'bi-clock-history' },
        { value: '< 15min', label: 'Response Time', icon: 'bi-lightning' }
    ];

    return (
        <>
            <section className="tech-features-section">
                <div className="container py-5">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-5"
                    >
                        Intelligent Maintenance Solutions
                    </motion.h2>
                    <div className="row g-4">
                        {techFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="col-md-6 col-lg-3"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="tech-card">
                                    <i className={`bi ${feature.icon}`}></i>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="metrics-section">
                <div className="container py-5">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-5"
                    >
                        Performance Metrics
                    </motion.h2>
                    <div className="row g-4">
                        {maintenanceMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                className="col-md-6 col-lg-3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="metric-card">
                                    <i className={`bi ${metric.icon}`}></i>
                                    <h3>{metric.value}</h3>
                                    <p>{metric.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="consultation-section">
                <div className="container py-5">
                    <motion.div 
                        className="consultation-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Ready to Upgrade Your Maintenance Strategy?</h2>
                        <p>Get a personalized consultation and discover how our smart maintenance solutions can transform your operations.</p>
                        
                        <div className="contact-grid">
                            <div className="contact-item">
                                <i className="bi bi-headset"></i>
                                <h4>24/7 Support</h4>
                                <p>Always available for emergencies</p>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-laptop"></i>
                                <h4>Remote Monitoring</h4>
                                <p>Real-time system oversight</p>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-person-check"></i>
                                <h4>Expert Team</h4>
                                <p>Certified maintenance specialists</p>
                            </div>
                        </div>

                        <motion.button 
                            className="consultation-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Schedule Consultation
                            <i className="bi bi-arrow-right-circle"></i>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <ContactModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default MaintenanceDetails;
