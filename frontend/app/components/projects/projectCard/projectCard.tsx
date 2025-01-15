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
        videos: { video: string }[];     
        documents: { document: string }[];
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [selectedImage, setSelectedImage] = useState<string>(project.primary_image);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allImages = [project.primary_image, ...project.additional_images.map(img => img.base64Image)];
    
    const getCurrentImageIndex = () => allImages.indexOf(selectedImage);

    const handlePrevImage = () => {
        const currentIndex = getCurrentImageIndex();
        const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
        setSelectedImage(allImages[newIndex]);
    };

    const handleNextImage = () => {
        const currentIndex = getCurrentImageIndex();
        const newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(allImages[newIndex]);
    };

    const handleDocumentClick = (documentData: string) => {
        const byteCharacters = atob(documentData.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
    };

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
                                    onClick={() => setIsModalOpen(true)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <button className="nav-arrow prev" onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}>
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <button className="nav-arrow next" onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
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

                        {(project.documents?.length > 0 || project.videos?.length > 0) && (
                            <div className="info-card mt-4">
                                <h3 className="card-title">
                                    <i className="bi bi-link-45deg"></i>
                                    Quick Actions
                                </h3>
                                <div className="action-buttons d-grid gap-3">
                                    {project.documents?.[0]?.document && (
                                        <button 
                                            onClick={() => handleDocumentClick(project.documents[0].document)}
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="bi bi-file-earmark-text"></i>
                                            View Documentation
                                        </button>
                                    )}
                                    {project.videos?.[0]?.video && (
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

            {project.videos?.[0]?.video && (
                <div className="modal fade" id="videoModal" tabIndex={-1}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Project Video</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <video controls src={project.videos[0].video} className="w-100">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="image-modal" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                        <button className="modal-nav-arrow prev" onClick={handlePrevImage}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <img src={selectedImage} alt={project.ProjectName} />
                        <button className="modal-nav-arrow next" onClick={handleNextImage}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
