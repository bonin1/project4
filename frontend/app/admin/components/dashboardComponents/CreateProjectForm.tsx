'use client';
import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../service/API';
import { ProjectFormFields } from '../shared/ProjectFormFields';
import { ProjectFileInputs } from '../shared/ProjectFileInputs';
import { ProjectFormData, FileState, ImagePreviews } from '../../types/project';

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
        ProjectManager: '',
        ProjectType: ''
    });
    const [files, setFiles] = useState<FileState>({
        primary_image: null,
        additional_images: [],
        video: null,
        document: null
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [imagePreviews, setImagePreviews] = useState<ImagePreviews>({
        primary_image: '',
        additional_images: [],
        video: '',
        document: ''
    });

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
            const filesArray = Array.from(fileList).slice(0, 5);
            setFiles(prev => ({
                ...prev,
                [name]: filesArray
            }));
            const previews = filesArray.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => ({
                ...prev,
                additional_images: previews
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
                    [name]: URL.createObjectURL(file)
                }));
            } else if (name === 'Video') {
                setImagePreviews(prev => ({
                    ...prev,
                    video: URL.createObjectURL(file)
                }));
            } else if (name === 'Document') {
                setImagePreviews(prev => ({
                    ...prev,
                    document: file.name
                }));
            }
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreviews.primary_image) {
                URL.revokeObjectURL(imagePreviews.primary_image);
            }
            imagePreviews.additional_images.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [imagePreviews]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', content: '' });

        const submitFormData = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            submitFormData.append(key, value);
        });

        if (files.primary_image) {
            submitFormData.append('primary_image', files.primary_image);
        }
        
        if (files.additional_images.length) {
            files.additional_images.forEach(file => {
                submitFormData.append('additional_images', file);
            });
        }
        
        if (files.video) {
            submitFormData.append('Video', files.video);
        }
        
        if (files.document) {
            submitFormData.append('Document', files.document);
        }

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
                    ProjectManager: '',
                    ProjectType: ''
                });
                setFiles({
                    primary_image: null,
                    additional_images: [],
                    video: null,
                    document: null
                });
                setImagePreviews({
                    primary_image: '',
                    additional_images: [],
                    video: '',
                    document: ''
                });
            } else {
                setMessage({ type: 'error', content: response.error || 'Failed to create project' });
            }
        } catch {
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
                        imagePreviews={imagePreviews}
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
