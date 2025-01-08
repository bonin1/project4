import React from 'react';
import { ProjectFormData } from '../../types/project';

interface ProjectFormFieldsProps {
    formData: ProjectFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const STATUS_OPTIONS = ['Planned', 'Ongoing', 'Completed', 'On Hold', 'Cancelled'];

export const ProjectFormFields: React.FC<ProjectFormFieldsProps> = ({
    formData,
    handleInputChange
}) => {

    return (
        <>
            <div className="mb-4">
                <h3 className="h5 mb-3">Basic Information</h3>
                <div className="mb-3">
                    <label className="form-label">Project Name</label>
                    <input
                        type="text"
                        name="ProjectName"
                        value={formData.ProjectName}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Project Description</label>
                    <textarea
                        name="ProjectDescription"
                        value={formData.ProjectDescription}
                        onChange={handleInputChange}
                        className="form-control"
                        rows={4}
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <h3 className="h5 mb-3">Project Details</h3>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Client Name</label>
                        <input
                            type="text"
                            name="ClientName"
                            value={formData.ClientName || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Project Manager</label>
                        <input
                            type="text"
                            name="ProjectManager"
                            value={formData.ProjectManager || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Budget</label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            name="Location"
                            value={formData.Location || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            name="StartDate"
                            value={formData.StartDate || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            name="EndDate"
                            value={formData.EndDate || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Status</label>
                        <select
                            name="Status"
                            value={formData.Status || ''}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Status</option>
                            {STATUS_OPTIONS.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};
