"use client";

import React, { useEffect, useState } from 'react';
import './CardsContainer.scss';
import { adminAPI } from '../../../service/API';

interface Project {
    ProjectID: number;
    ProjectName: string;
    Location: string;
    Status: string;
    EndDate: string;
    primary_image: string;
}

export default function CompletedProjects() {
    const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await adminAPI.getProjects();
            if (response.success) {
                const filtered = response.data
                    .filter((project: Project) => project.Status === 'Completed')
                    .sort((a: Project, b: Project) => 
                        new Date(b.EndDate).getTime() - new Date(a.EndDate).getTime()
                    );
                setCompletedProjects(filtered);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth > 1200) setCardsToShow(4);
            else if (window.innerWidth > 992) setCardsToShow(3);
            else if (window.innerWidth > 576) setCardsToShow(2);
            else setCardsToShow(1);
        };

        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    const nextCard = () => {
        if (activeIndex < completedProjects.length - cardsToShow) {
            setActiveIndex(prev => prev + 1);
        }
    };

    const prevCard = () => {
        if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
        }
    };

    const isCardActive = (index: number) => {
        return index >= activeIndex && index < activeIndex + cardsToShow;
    };

    const calculateTransform = () => {
        const basePercentage = 100 / cardsToShow;
        const gapOffset = 1.5 * activeIndex;
        return `translateX(-${(activeIndex * basePercentage) + gapOffset}%)`;
    };

    return (
        <section className="completed-section">
            <h2 className="text-center mb-4">Recently Completed Projects</h2>
            
            <div className="projects-container">
                {activeIndex > 0 && (
                    <button className="nav-arrow prev" onClick={prevCard}>&lt;</button>
                )}
                
                <div 
                    className="projects-grid"
                    style={{
                        transform: calculateTransform()
                    }}
                >
                    {completedProjects.map((project, index) => (
                        <div 
                            key={project.ProjectID} 
                            className={`project-card ${isCardActive(index) ? 'active' : ''}`}
                        >
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${project.primary_image})`
                                }}
                            >
                                <div className="project-info">
                                    <h3 className="text-light ">{project.ProjectName}</h3>
                                    <p className="text-light">{project.Location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {activeIndex < completedProjects.length - cardsToShow && (
                    <button className="nav-arrow next" onClick={nextCard}>&gt;</button>
                )}
            </div>
        </section>
    );
}
