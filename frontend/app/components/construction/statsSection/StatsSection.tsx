'use client';
import React from 'react';
import { motion } from 'framer-motion';
import './StatsSection.scss';

const StatsSection = () => {
    const stats = [
        { value: '20+', label: 'Projects Completed', icon: 'bi-building' },
        { value: '25+', label: 'Years Experience', icon: 'bi-calendar-check' },
        { value: '100%', label: 'Client Satisfaction', icon: 'bi-emoji-smile' },
        { value: '250+', label: 'Team Members', icon: 'bi-people' }
    ];

    return (
        <section className="stats-section">
            <div className="stats-background"></div>
            <div className="stats-overlay">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <i className={`bi ${stat.icon}`}></i>
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
