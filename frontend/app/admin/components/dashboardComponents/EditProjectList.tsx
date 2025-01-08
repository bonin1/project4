'use client';
import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../service/API';
import { ProjectFormFields } from '../shared/ProjectFormFields';
import { ProjectFileInputs } from '../shared/ProjectFileInputs';
import { Project, ProjectFormData, FileState, ImagePreviews } from '../../types/project';

const EditProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [editFormData, setEditFormData] = useState({
        ProjectName: '',
        ProjectDescription: '',
        ClientName: '',
        StartDate: '',
        EndDate: '',
        Status: '',
        budget: '',
        Location: '',
        ProjectManager: ''
    });
    const [files, setFiles] = useState({
        primary_image: null,
        additional_images: [],
        Video: null,
        Document: null
    });
    const [imagePreviews, setImagePreviews] = useState({
        primary_image: '',
        additional_images: [] as string[]
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            setEditFormData({
                ProjectName: selectedProject.ProjectName || '',
                ProjectDescription: selectedProject.ProjectDescription || '',
                ClientName: selectedProject.ClientName || '',
                StartDate: selectedProject.StartDate ? selectedProject.StartDate.split('T')[0] : '',
                EndDate: selectedProject.EndDate ? selectedProject.EndDate.split('T')[0] : '',
                Status: selectedProject.Status || '',
                budget: selectedProject.budget ? selectedProject.budget.toString() : '',
                Location: selectedProject.Location || '',
                ProjectManager: selectedProject.ProjectManager || ''
            });
            
            setFiles({
                primary_image: null,
                additional_images: [],
                Video: null,
                Document: null
            });
            
            setImagePreviews({
                primary_image: selectedProject.primary_image || '',
                additional_images: [] 
            });
        }
    }, [selectedProject]);

    useEffect(() => {
        return () => {
            imagePreviews.additional_images.forEach(preview => {
                if (preview.startsWith('blob:')) {
                    URL.revokeObjectURL(preview);
                }
            });
            if (imagePreviews.primary_image.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreviews.primary_image);
            }
        };
    }, [imagePreviews]);

    const fetchProjects = async () => {
        const response = await adminAPI.getProjects();
        if (response.success) {
            setProjects(response.data);
        } else {
            setError('Failed to fetch projects');
        }
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: fileList } = e.target;
        
        if (!fileList) return;

        if (name === 'additional_images') {
            const filesArray = Array.from(fileList).slice(0, 5);
            setFiles(prev => ({
                ...prev,
                [name]: filesArray
            }));
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => ({
                ...prev,
                additional_images: newPreviews 
            }));
        } else if (name === 'primary_image') {
            const file = fileList[0];
            setFiles(prev => ({
                ...prev,
                [name]: file
            }));
            setImagePreviews(prev => ({
                ...prev,
                primary_image: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        
        Object.entries(editFormData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (files.primary_image) formData.append('primary_image', files.primary_image);
        if (files.additional_images.length) {
            files.additional_images.forEach((file) => {
                formData.append('additional_images', file);
            });
        }
        if (files.Video) formData.append('Video', files.Video);
        if (files.Document) formData.append('Document', files.Document);


        const response = await adminAPI.editProject(selectedProject.ProjectID, formData);
        if (response.success) {
            setMessage({ type: 'success', content: 'Project updated successfully!' });
            fetchProjects();
            setSelectedProject(null);
        } else {
            setMessage({ type: 'error', content: response.error });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container py-4">
            <h2 className="mb-4">Edit Projects</h2>
            
            {message.content && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {message.content}
                </div>
            )}

            {projects.length === 0 ? (
                <div className="alert alert-info">No projects found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.ProjectID}>
                                    <td>{project.ProjectName}</td>
                                    <td>{project.ClientName}</td>
                                    <td>{project.Status}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedProject && (
                <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Project: {selectedProject.ProjectName}</h5>
                                <button 
                                    type="button" 
                                    className="btn-close"
                                    onClick={() => setSelectedProject(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <ProjectFormFields 
                                        formData={editFormData}
                                        handleInputChange={handleInputChange}
                                    />
                                    <ProjectFileInputs
                                        files={files}
                                        imagePreviews={imagePreviews}
                                        handleFileChange={handleFileChange}
                                        existingProject={selectedProject}
                                    />
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary"
                                            onClick={() => setSelectedProject(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProjectList;
