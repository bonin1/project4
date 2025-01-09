"use client";

import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../../service/API';
import './CardsContainer.scss'

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

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await adminAPI.getProjects();
            if (response.success) {
                const filtered = response.data
                    .filter((project: Project) => project.Status === 'Completed')
                    .sort((a: Project, b: Project) => 
                        new Date(b.EndDate).getTime() - new Date(a.EndDate).getTime()
                    )
                    .slice(0, 5);
                setCompletedProjects(filtered);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="py-5">
            <h2 className="text-center mb-4">Recently Completed Projects</h2>
            <div className="row g-4">
                {completedProjects.map((project) => (
                    <div key={project.ProjectID} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm position-relative overflow-hidden">
                            <div 
                                className="card-img-top"
                                style={{
                                    height: '250px',
                                    backgroundImage: `url(${project.primary_image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="card-img-overlay d-flex align-items-end">
                                    <div className="text-white w-100" style={{background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'}}>
                                        <h3 className="h5 mb-1">{project.ProjectName}</h3>
                                        <p className="mb-2">{project.Location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
