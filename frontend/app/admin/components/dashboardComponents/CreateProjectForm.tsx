'use client';
import React, { useState } from 'react';
import { adminAPI } from '../../../service/API';

interface FileState {
    primary_image: File | null;
    additional_images: File[];
    Video: File | null;
    Document: File | null;
}

const CreateProjectForm = () => {
    const [formData, setFormData] = useState({
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
        
        // Append text fields
        Object.entries(formData).forEach(([key, value]) => {
            submitFormData.append(key, value);
        });

        // Append files
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
                // Reset form
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
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            
            {message.content && (
                <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.content}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block mb-1">Project Name</label>
                    <input
                        type="text"
                        name="ProjectName"
                        value={formData.ProjectName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Project Description</label>
                    <textarea
                        name="ProjectDescription"
                        value={formData.ProjectDescription}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Client Name</label>
                        <input
                            type="text"
                            name="ClientName"
                            value={formData.ClientName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Project Manager</label>
                        <input
                            type="text"
                            name="ProjectManager"
                            value={formData.ProjectManager}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Start Date</label>
                        <input
                            type="date"
                            name="StartDate"
                            value={formData.StartDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">End Date</label>
                        <input
                            type="date"
                            name="EndDate"
                            value={formData.EndDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Budget</label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Location</label>
                        <input
                            type="text"
                            name="Location"
                            value={formData.Location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Status</label>
                    <select
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1">Primary Image</label>
                        <input
                            type="file"
                            name="primary_image"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Additional Images (up to 5)</label>
                        <input
                            type="file"
                            name="additional_images"
                            onChange={handleFileChange}
                            accept="image/*"
                            multiple
                            max="5"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Video</label>
                        <input
                            type="file"
                            name="Video"
                            onChange={handleFileChange}
                            accept="video/*"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Document</label>
                        <input
                            type="file"
                            name="Document"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {loading ? 'Creating Project...' : 'Create Project'}
            </button>
        </form>
    );
};

export default CreateProjectForm;
