'use client';

import React, { useState, useEffect, useRef } from 'react';
import './Stats.scss';

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({
        founded: 0,
        team: 0,
        projects: 0,
        success: 0
    });
    const statsRef = useRef(null);

    const stats = [
        {
            value: '1995',
            displayValue: counts.founded,
            label: 'Founded',
            icon: 'bi bi-building-check',
            isNumeric: false
        },
        {
            value: '250+',
            displayValue: counts.team,
            suffix: '+',
            label: 'Team Members',
            icon: 'bi bi-people-fill',
            isNumeric: true
        },
        {
            value: '1500+',
            displayValue: counts.projects,
            suffix: '+',
            label: 'Projects Done',
            icon: 'bi bi-trophy-fill',
            isNumeric: true
        },
        {
            value: '98%',
            displayValue: counts.success,
            suffix: '%',
            label: 'Success Rate',
            icon: 'bi bi-graph-up-arrow',
            isNumeric: true
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const duration = 2000; // 2 seconds for the complete animation
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            
            let frame = 0;
            const timer = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                
                setCounts({
                    founded: 1995,
                    team: Math.floor(progress * 250),
                    projects: Math.floor(progress * 1500),
                    success: Math.floor(progress * 98)
                });
                
                if (frame === totalFrames) {
                    clearInterval(timer);
                }
            }, frameDuration);
            
            return () => clearInterval(timer);
        }
    }, [isVisible]);

    return (
        <section className="stats-section" ref={statsRef}>
            <div className={`stats-container ${isVisible ? 'animate' : ''}`}>
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className={`stat-item ${isVisible ? 'visible' : ''}`} 
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className="stat-icon">
                            <i className={stat.icon}></i>
                        </div>
                        <h3>
                            {stat.isNumeric ? (
                                <>
                                    {stat.displayValue}
                                    <span className="suffix">{stat.suffix || ''}</span>
                                </>
                            ) : (
                                stat.value
                            )}
                        </h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
