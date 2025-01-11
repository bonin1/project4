import React from 'react';
import './Milestone.scss';
import Image from 'next/image';

const Milestone = () => {
    const milestones = [
        {
            year: '1995',
            title: 'Company Founded',
            description: 'Started with a vision to revolutionize the construction industry',
            image: '/milestone/founded.jpg'
        },
        {
            year: '2005',
            title: 'International Expansion',
            description: 'Expanded operations across multiple countries',
            image: '/milestone/expansion.jpeg'
        },
        {
            year: '2015',
            title: 'Sustainable Innovation',
            description: 'Pioneered green building technologies',
            image: '/milestone/sustainableInnovation.jpg'
        },
        {
            year: '2023',
            title: 'Digital Transformation',
            description: 'Embracing AI and smart construction solutions',
            image: '/milestone/transformation.jpg'
        }
    ];

    return (
        <section className="milestones-section">
            <div className="milestone-header">
                <span className="section-badge">Our Journey</span>
                <h2>Key Milestones That Define Us</h2>
                <p>A legacy of excellence and innovation in construction</p>
            </div>

            <div className="timeline-container">
                <div className="timeline-line"></div>
                {milestones.map((milestone, index) => (
                    <div key={index} className={`milestone-card ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="milestone-content">
                            <div className="year-marker">
                                <span className="year">{milestone.year}</span>
                                <div className="dot"></div>
                            </div>
                            <div className="card-body">
                                <div className="image-container">
                                    <Image 
                                        src={milestone.image}
                                        alt={milestone.title}
                                        width={400}
                                        height={300}
                                        className="milestone-image"
                                    />
                                    <div className="image-overlay"></div>
                                </div>
                                <div className="text-content">
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="achievement-summary">
                <div className="summary-card">
                    <div className="icon-container">
                        <i className="bi bi-trophy-fill"></i>
                    </div>
                    <div className="summary-content">
                        <span className="number">25+</span>
                        <span className="label">Years of Excellence</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Milestone;