'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './imageHeader.scss';

const ImageHeader = () => {
    const { scrollY } = useScroll();
    
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="image-header">
            <div className="overlay">
                <motion.h1 
                    style={{ y: y1, opacity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Construction Services
                </motion.h1>
                <motion.p 
                    style={{ y: y2, opacity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Building Tomorrow's Infrastructure Today
                </motion.p>
            </div>
        </div>
    );
};

export default ImageHeader;
