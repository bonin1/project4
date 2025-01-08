'use client';
import React, { useState } from 'react';
import { adminAPI } from '../../../service/API';
import { ProjectFormFields } from '../shared/ProjectFormFields';
import { ProjectFileInputs } from '../shared/ProjectFileInputs';
import { ProjectFormData, FileState } from '../../types/project';

const CreateProjectForm = () => {
    const [formData, setFormData] = useState<ProjectFormData>({
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
    const [files, setFiles] = useState<FileState>({
        primary_image: null,
        additional_images: [],
        Video: null,
        Document: null
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: fileList } = e.target;
        
        if (!fileList) return;

        if (name === 'additional_images') {
            const filesArray = Array.from(fileList).slice(0, 5)
            setFiles(prev => ({
                ...prev,
                [name]: filesArray
            }));
        } else {
            setFiles(prev => ({
                ...prev,
                [name]: fileList[0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', content: '' });

        const submitFormData = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            submitFormData.append(key, value);
        });

        if (files.primary_image) submitFormData.append('primary_image', files.primary_image);
        if (files.additional_images.length) {
            files.additional_images.forEach(file => {
                submitFormData.append('additional_images', file);
            });
        }
        if (files.Video) submitFormData.append('Video', files.Video);
        if (files.Document) submitFormData.append('Document', files.Document);

        try {
            const response = await adminAPI.createProject(submitFormData);
            if (response.success) {
                setMessage({ type: 'success', content: 'Project created successfully!' });
                setFormData({
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
                setFiles({
                    primary_image: null,
                    additional_images: [],
                    Video: null,
                    Document: null
                });
            } else {
                setMessage({ type: 'error', content: response.error });
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to create project' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <form onSubmit={handleSubmit} className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="h4 mb-0">Create New Project</h2>
                </div>

                {message.content && (
                    <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} m-3`}>
                        {message.content}
                    </div>
                )}

                <div className="card-body">
                    <ProjectFormFields 
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                    <ProjectFileInputs
                        files={files}
                        handleFileChange={handleFileChange}
                    />
                </div>

                <div className="card-footer">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-100"
                    >
                        {loading ? (
                            <span>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating Project...
                            </span>
                        ) : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectForm;
