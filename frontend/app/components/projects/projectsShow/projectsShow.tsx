"use client";

import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../../service/API';
import './projectsShow.scss';

interface Project {
    ProjectID: number;
    ProjectName: string;
    Location: string;
    Status: string;
    EndDate: string;
    primary_image: string;
}

const ProjectsShow = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const projectsPerPage = 12;

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await adminAPI.getProjects();
            if (response.success) {
                setProjects(response.data);
            }
        };
        fetchProjects();
    }, []);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const currentProjects = projects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <section className="projects-show">
            <h2 className="section-title text-center mb-5">Our Project Portfolio</h2>
            
            <div className="projects-grid">
                {currentProjects.map((project) => (
                    <div key={project.ProjectID} className="project-card">
                        <div 
                            className="project-image"
                            style={{ backgroundImage: `url(${project.primary_image})` }}
                        >
                            <div className="project-overlay">
                                <span className={`project-status ${project.Status.toLowerCase().replace(/\s+/g, '')}`}>
                                    {project.Status}
                                </span>
                                <div className="project-details">
                                    <h3>{project.ProjectName}</h3>
                                    <div className="project-meta">
                                        <span className="location">
                                            <i className="bi bi-geo-alt-fill"></i>
                                            {project.Location}
                                        </span>
                                        <span className="completion-date">
                                            <i className="bi bi-calendar-check"></i>
                                            {new Date(project.EndDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <button className="view-project-btn">
                                        View Details
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="carousel-controls">
                    <button 
                        className="control-btn prev"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <div className="page-indicator">
                        Page {currentPage + 1} of {totalPages}
                    </div>
                    <button 
                        className="control-btn next"
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProjectsShow;
