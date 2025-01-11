import React from 'react';
import Image from 'next/image';
import './Leadership.scss';

const LeaderShip = () => {
    const leaders = [
        {
            name: 'Robert Miller',
            position: 'Chief Executive Officer',
            image: '/human.png',
            description: 'Visionary leader with 30+ years of experience in construction and development. Leading our company into a sustainable future.',
            expertise: ['Strategic Planning', 'Business Development', 'Industry Innovation'],
            stats: {
                experience: '30+',
                projects: '2500+',
                value: '$2B+'
            },
            linkedin: '#',
            email: 'robert.miller@company.com'
        },
        {
            name: 'Sarah Anderson',
            position: 'Chief Operations Officer',
            image: '/human.png',
            description: 'Operations expert specializing in large-scale project management and organizational efficiency.',
            expertise: ['Project Management', 'Operational Excellence', 'Team Leadership'],
            stats: {
                teamSize: '500+',
                efficiency: '35%',
                delivery: '99%'
            },
            linkedin: '#',
            email: 'sarah.anderson@company.com'
        },
        {
            name: 'David Chen',
            position: 'Chief Technology Officer',
            image: '/human.png',
            description: 'Technology innovator driving digital transformation in construction methodologies.',
            expertise: ['Digital Innovation', 'Smart Construction', 'Sustainability'],
            stats: {
                innovation: '40+',
                patents: '15',
                digital: '100%'
            },
            linkedin: '#',
            email: 'david.chen@company.com'
        }
    ];

    return (
        <section className="leadership-section">
            <div className="leadership-header">
                <div className="header-content">
                    <span className="section-badge">Leadership Team</span>
                    <h2>Visionary Leaders Shaping the Future</h2>
                    <p>Meet the experts driving innovation and excellence in construction</p>
                </div>
                <div className="header-decoration"></div>
            </div>

            <div className="leaders-showcase">
                {leaders.map((leader, index) => (
                    <div key={index} className="leader-profile">
                        <div className="profile-main">
                            <div className="image-container">
                                <Image 
                                    src={leader.image}
                                    alt={leader.name}
                                    width={400}
                                    height={500}
                                    className="profile-image"
                                />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="profile-content">
                                <h3>{leader.name}</h3>
                                <span className="position">{leader.position}</span>
                                <p className="description">{leader.description}</p>
                                
                                <div className="expertise-tags">
                                    {leader.expertise.map((skill, idx) => (
                                        <span key={idx} className="expertise-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="profile-footer">
                            <div className="stats-grid">
                                {Object.entries(leader.stats).map(([key, value]) => (
                                    <div key={key} className="stat-item">
                                        <span className="stat-value">{value}</span>
                                        <span className="stat-label">{key}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="contact-links">
                                <a href={leader.linkedin} className="social-link">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                                <a href={`mailto:${leader.email}`} className="social-link">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LeaderShip;