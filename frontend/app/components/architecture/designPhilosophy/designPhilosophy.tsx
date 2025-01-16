'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './designPhilosophy.scss';

const philosophyPoints = [
    {
        id: 1,
        title: "Design Excellence",
        description: "Creating iconic spaces that push architectural boundaries while maintaining functionality",
        icon: "🎨",
        image: "/completed.jpg"
    },
    {
        id: 2,
        title: "Sustainable Future",
        description: "Integrating eco-friendly solutions and renewable materials in every project",
        icon: "🌱",
        image: "/construction1.jpg"
    },
    {
        id: 3,
        title: "Human-Centric",
        description: "Prioritizing user experience and comfort in every architectural decision",
        icon: "👥",
        image: "/sustainable.jpg"
    },
    {
        id: 4,
        title: "Innovation First",
        description: "Embracing cutting-edge technology and modern construction methods",
        icon: "💡",
        image: "/team.jpg"
    }
];

const DesignPhilosophy = () => {
    const [activePoint, setActivePoint] = useState(1);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section className="design-philosophy" ref={ref}>
            <motion.div 
                className="background-pattern"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            />
            
            <div className="container position-relative">
                <motion.div 
                    className="section-header"
                    initial={{ y: 30, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Our Design Philosophy</h2>
                    <div className="subtitle">Creating Tomorrow's Landmarks Today</div>
                </motion.div>

                <div className="philosophy-content">
                    <div className="philosophy-points">
                        {philosophyPoints.map((point, index) => (
                            <motion.div
                                key={point.id}
                                className={`philosophy-card ${activePoint === point.id ? 'active' : ''}`}
                                initial={{ x: -50, opacity: 0 }}
                                animate={inView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onClick={() => setActivePoint(point.id)}
                            >
                                <div className="card-content">
                                    <span className="point-icon">{point.icon}</span>
                                    <h3>{point.title}</h3>
                                    <p>{point.description}</p>
                                </div>
                                <motion.div 
                                    className="hover-indicator"
                                    animate={{ 
                                        width: activePoint === point.id ? '100%' : '0%'
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        className="visual-showcase"
                        animate={{ 
                            backgroundImage: `url(${philosophyPoints.find(p => p.id === activePoint)?.image})`
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="overlay" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DesignPhilosophy;
