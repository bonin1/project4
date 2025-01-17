'use client';
import React from 'react';
import { motion } from 'framer-motion';
import './Statistics.scss';

const Statistics = () => {
    const stats = [
        {
            number: "5+",
            label: "Projects Completed",
            icon: "🏗️"
        },
        {
            number: "50km",
            label: "Total Tunnel Length",
            icon: "📏"
        },
        {
            number: "25+",
            label: "Years Experience",
            icon: "⭐"
        },
        {
            number: "100%",
            label: "Safety Record",
            icon: "🛡️"
        }
    ];

    return (
        <section className="statistics-section">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Our Achievements
            </motion.h2>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="stat-card"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <span className="stat-icon">{stat.icon}</span>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {stat.number}
                        </motion.h3>
                        <p>{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Statistics;
