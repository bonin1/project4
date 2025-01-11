'use client';

import React from 'react';
import './Stats.scss';

const Stats = () => {
    const stats = [
        {
            value: '1995',
            label: 'Founded',
            icon: 'bi bi-building-check'
        },
        {
            value: '250+',
            label: 'Team Members',
            icon: 'bi bi-people-fill'
        },
        {
            value: '1500+',
            label: 'Projects Done',
            icon: 'bi bi-trophy-fill'
        },
        {
            value: '98%',
            label: 'Success Rate',
            icon: 'bi bi-graph-up-arrow'
        }
    ];

    return (
        <section className="stats-section">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-icon">
                            <i className={stat.icon}></i>
                        </div>
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
