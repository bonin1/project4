'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './visionSection.scss';

const VisionSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const particles = Array.from({ length: 50 });
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section className="vision-section" ref={sectionRef}>
            <div className="particle-container">
                {particles.map((_, index) => (
                    <motion.div
                        key={index}
                        className="particle"
                        initial={{ 
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0
                        }}
                        animate={{ 
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 1
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.1
                        }}
                    />
                ))}
            </div>

            <motion.div 
                className="vision-content"
                style={{ scale }}
            >
                <motion.div 
                    className="rotating-circle"
                    style={{ rotate }}
                />
                
                <div className="text-content">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Our Vision
                    </motion.h2>
                    
                    <div className="vision-grid">
                        {[
                            { title: "Innovation", value: "2025" },
                            { title: "Sustainability", value: "100%" },
                            { title: "Impact", value: "Global" },
                            { title: "Green Tech", value: "Future" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                className="stat-card"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3>{item.title}</h3>
                                <span>{item.value}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Pioneering sustainable solutions for a brighter tomorrow
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
};

export default VisionSection;
