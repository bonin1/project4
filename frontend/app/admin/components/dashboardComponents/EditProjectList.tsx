'use client';
import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../service/API';
import { ProjectFormFields } from '../shared/ProjectFormFields';
import { ProjectFileInputs } from '../shared/ProjectFileInputs';
import { Project, ProjectFormData, FileState } from '../../types/project';

const EditProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [editFormData, setEditFormData] = useState<ProjectFormData>({
        ProjectName: '',
        ProjectDescription: '',
        ClientName: '',
        StartDate: '',
        EndDate: '',
        Status: '',
        budget: '',
        Location: '',
        ProjectManager: '',
        ProjectType: ''
    });
    const [files, setFiles] = useState<FileState>({
        primary_image: null,
        additional_images: [] as File[],
        video: null,
        document: null
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
                ProjectManager: selectedProject.ProjectManager || '',
                ProjectType: selectedProject.ProjectType || ''
            });
            
            setFiles({
                primary_image: null,
                additional_images: [],
                video: null,
                document: null
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
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: name === 'Status' ? (value as ProjectFormData['Status']) : value
        }));
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
        } else {
            const file = fileList[0];
            setFiles(prev => ({
                ...prev,
                [name]: file
            }));

            if (name === 'primary_image') {
                setImagePreviews(prev => ({
                    ...prev,
                    primary_image: URL.createObjectURL(file)
                }));
            } else if (name === 'Video') {
                setFiles(prev => ({
                    ...prev,
                    video: file
                }));
                setImagePreviews(prev => ({
                    ...prev,
                    video: URL.createObjectURL(file)
                }));
            } else if (name === 'Document') {
                setFiles(prev => ({
                    ...prev,
                    document: file
                }));
                setImagePreviews(prev => ({
                    ...prev,
                    document: file.name
                }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedProject) {
            setMessage({ type: 'error', content: 'No project selected' });
            return;
        }

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
        if (files.video) formData.append('Video', files.video);
        if (files.document) formData.append('Document', files.document);

        const response = await adminAPI.editProject(selectedProject.ProjectID, formData);
        if (response.success) {
            setMessage({ type: 'success', content: 'Project updated successfully!' });
            fetchProjects();
            setSelectedProject(null);
        } else {
            setMessage({ type: 'error', content: response.error || 'Failed to edit project'  });
        }
    };

    const handleDelete = async (projectId: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            const response = await adminAPI.deleteProject(projectId);
            if (response.success) {
                setMessage({ type: 'success', content: 'Project deleted successfully!' });
                fetchProjects();
            } else {
                setMessage({ type: 'error', content: response.error || 'Failed to delete project' });
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to delete project' });
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
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(project.ProjectID)}
                                        >
                                            Delete
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
