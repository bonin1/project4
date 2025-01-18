'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './sustainabilityContent.scss';
import VisionSection from '../visionSection/visionSection';

const SustainabilityContent = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
    const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.1]), springConfig);

    return (
        <div className="sustainability-new" ref={containerRef}>
            <section className="hero-3d">
                <motion.div 
                    className="floating-text"
                    style={{ y }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1>Sustainability Redefined</h1>
                    <div className="gradient-line"></div>
                </motion.div>
            </section>

            <section className="perspective-grid">
                {[
                    {
                        title: "Future Forward",
                        description: "Revolutionary sustainable technologies",
                        image: "/eco/sustainable-city.jpg"
                    },
                    {
                        title: "Eco Innovation",
                        description: "Pushing boundaries of green design",
                        image: "/eco/trees.jpg"
                    }
                ].map((item, index) => (
                    <motion.div 
                        key={index}
                        className="perspective-card"
                        initial={{ opacity: 0, rotateX: 45 }}
                        whileInView={{ opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <div className="card-content">
                            <motion.div 
                                className="image-container"
                                style={{ scale }}
                            >
                                <img src={item.image} alt={item.title} />
                            </motion.div>
                            <div className="text-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            <section className="infinite-scroll">
                <div className="scroll-container">
                    <motion.div 
                        className="scroll-text"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear"
                        }}
                    >
                        <span>SUSTAINABLE FUTURE</span>
                        <span>ECO FRIENDLY</span>
                        <span>GREEN TECHNOLOGY</span>
                    </motion.div>
                </div>
            </section>

            <VisionSection />
        </div>
    );
};

export default SustainabilityContent;
