'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './serviceOverview.scss';

const services = [
    {
        icon: '🏛️',
        title: 'Custom Design',
        description: 'Bespoke architectural solutions tailored to your vision and needs'
    },
    {
        icon: '🌿',
        title: 'Sustainable Architecture',
        description: 'Eco-friendly designs that minimize environmental impact'
    },
    {
        icon: '🏗️',
        title: 'Urban Planning',
        description: 'Comprehensive city planning and development strategies'
    },
    {
        icon: '🎨',
        title: 'Interior Design',
        description: 'Harmonious spaces that blend functionality with aesthetics'
    }
];

const ServiceOverview = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section className="service-overview py-5" ref={ref}>
            <div className="container">
                <div className="row g-4">
                    {services.map((service, index) => (
                        <div key={index} className="col-md-6 col-lg-3">
                            <motion.div 
                                className="service-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="icon-wrapper">
                                    <span className="service-icon">{service.icon}</span>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceOverview;
