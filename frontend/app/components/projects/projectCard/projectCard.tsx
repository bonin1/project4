import { useState } from 'react';
import Link from 'next/link';
import './projectCard.scss';

interface ProjectCardProps {
    project: {
        ProjectID: number;
        ProjectName: string;
        Location: string;
        Status: string;
        StartDate: string;
        EndDate: string;
        ProjectDescription: string;
        budget: number;
        ClientName: string;
        ProjectManager: string;
        primary_image: string;
        additional_images: { base64Image: string }[];
        Video: string | null;
        Document: string | null;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [selectedImage, setSelectedImage] = useState<string>(project.primary_image);

    const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="project-page">
            <div className="container py-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/projects">Projects</Link></li>
                        <li className="breadcrumb-item active">{project.ProjectName}</li>
                    </ol>
                </nav>

                <div className="project-header">
                    <h1 className="project-title">{project.ProjectName}</h1>
                    <div className="meta-tags">
                        <span className={`status-badge ${project.Status.toLowerCase().replace(' ', '-')}`}>
                            {project.Status}
                        </span>
                        <span className="meta-item">
                            <i className="bi bi-geo-alt-fill"></i>
                            {project.Location}
                        </span>
                        <span className="meta-item">
                            <i className="bi bi-calendar-check"></i>
                            {formatDate(project.EndDate)}
                        </span>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="gallery-section">
                            <div className="main-image-container">
                                <img 
                                    src={selectedImage || project.primary_image} 
                                    alt={project.ProjectName}
                                />
                            </div>
                            <div className="thumbnails">
                                <div 
                                    className={`thumbnail ${selectedImage === project.primary_image ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(project.primary_image)}
                                >
                                    <img src={project.primary_image} alt="Primary" />
                                </div>
                                {project.additional_images.map((img, index) => (
                                    <div 
                                        key={index}
                                        className={`thumbnail ${selectedImage === img.base64Image ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(img.base64Image)}
                                    >
                                        <img src={img.base64Image} alt={`Additional ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="info-card mt-4">
                            <h3 className="card-title">
                                <i className="bi bi-file-text"></i>
                                Project Description
                            </h3>
                            <p>{project.ProjectDescription}</p>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="info-card">
                            <h3 className="card-title">
                                <i className="bi bi-info-circle"></i>
                                Project Details
                            </h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <div className="label">Project ID</div>
                                    <div className="value">#{project.ProjectID}</div>
                                </div>
                                <div className="info-item">
                                    <div className="label">Budget</div>
                                    <div className="value">{project.budget}</div>
                                </div>
                                <div className="info-item">
                                    <div className="label">Client</div>
                                    <div className="value">{project.ClientName}</div>
                                </div>
                                <div className="info-item">
                                    <div className="label">Project Manager</div>
                                    <div className="value">{project.ProjectManager}</div>
                                </div>
                                <div className="info-item">
                                    <div className="label">Start Date</div>
                                    <div className="value">{formatDate(project.StartDate)}</div>
                                </div>
                                <div className="info-item">
                                    <div className="label">End Date</div>
                                    <div className="value">{formatDate(project.EndDate)}</div>
                                </div>
                            </div>
                        </div>

                        {(project.Document || project.Video) && (
                            <div className="info-card mt-4">
                                <h3 className="card-title">
                                    <i className="bi bi-link-45deg"></i>
                                    Quick Actions
                                </h3>
                                <div className="action-buttons d-grid gap-3">
                                    {project.Document && (
                                        <a 
                                            href={project.Document}
                                            className="btn btn-outline-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="bi bi-file-earmark-text"></i>
                                            View Documentation
                                        </a>
                                    )}
                                    {project.Video && (
                                        <button 
                                            className="btn btn-outline-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#videoModal"
                                        >
                                            <i className="bi bi-camera-video"></i>
                                            Watch Project Video
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {project.Video && (
                <div className="modal fade" id="videoModal" tabIndex={-1}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Project Video</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <video controls src={project.Video} className="w-100">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
