"use client";

import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../../service/API';
import '../../../components/Home/CardsContainer/CardsContainer.scss';
import { useRouter } from 'next/navigation';

interface Project {
    ProjectID: number;
    ProjectName: string;
    Location: string;
    Status: string;
    EndDate: string;
    primary_image: string;
    ProjectType: string;
}

export default function ConstructionProjects() {
    const router = useRouter();
    const [constructionProjects, setConstructionProjects] = useState<Project[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await adminAPI.getProjects();
            if (response.success) {
                const filtered = response.data
                    .filter((project: Project) => project.ProjectType === 'Construction')
                    .sort((a: Project, b: Project) => 
                        new Date(b.EndDate).getTime() - new Date(a.EndDate).getTime()
                    );
                setConstructionProjects(filtered);
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
        if (activeIndex < constructionProjects.length - cardsToShow) {
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

    const handleCardClick = (projectId: number) => {
        router.push(`/projects/${projectId}`);
    };

    return (
        <section className="completed-section">
            <h2 className="text-start mb-4">Construction Projects</h2>
            
            <div className="projects-container" style={{ paddingBottom: '20px' }}>
                {activeIndex > 0 && (
                    <button className="nav-arrow prev" onClick={prevCard}>&lt;</button>
                )}
                
                <div 
                    className="projects-grid"
                    style={{
                        transform: calculateTransform()
                    }}
                >
                    {constructionProjects.map((project, index) => (
                        <div 
                            key={project.ProjectID} 
                            className={`project-card ${isCardActive(index) ? 'active' : ''}`}
                            onClick={() => handleCardClick(project.ProjectID)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${project.primary_image})`
                                }}
                            >
                                <div className="project-info">
                                    <h3 className="text-light mb-2">{project.ProjectName}</h3>
                                    <p className="text-light mb-1">{project.Location}</p>
                                    <p className="text-light">Status: {project.Status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {activeIndex < constructionProjects.length - cardsToShow && (
                    <button className="nav-arrow next" onClick={nextCard}>&gt;</button>
                )}
            </div>
        </section>
    );
}