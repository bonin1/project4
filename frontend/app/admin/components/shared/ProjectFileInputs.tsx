import React from 'react';
import { FileState, ImagePreviews } from '../../types/project';

interface ProjectFileInputsProps {
    files: FileState;
    imagePreviews?: ImagePreviews;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    existingProject?: {
        primary_image?: string | null;
        additional_images?: { base64Image: string }[];
        Video?: string | null;
        Document?: string | null;
    };
}

export const ProjectFileInputs: React.FC<ProjectFileInputsProps> = ({
    files,
    imagePreviews,
    handleFileChange,
    existingProject
}) => {
    return (
        <div className="mb-4">
            <h3 className="h5 mb-3">Project Files</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Primary Image</label>
                    <input
                        type="file"
                        name="primary_image"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="form-control"
                    />
                    {(imagePreviews?.primary_image || existingProject?.primary_image) && (
                        <div className="mt-2">
                            <img 
                                src={imagePreviews?.primary_image || existingProject?.primary_image || ''}
                                alt="Primary"
                                className="img-thumbnail"
                                style={{ maxHeight: '150px' }}
                            />
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Additional Images (up to 5)</label>
                    <input
                        type="file"
                        name="additional_images"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="form-control"
                    />
                    <div className="mt-2 d-flex flex-wrap gap-2">
                        {imagePreviews?.additional_images?.map((preview, index) => (
                            <img 
                                key={`preview-${index}`}
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="img-thumbnail"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        ))}
                        {!imagePreviews?.additional_images?.length && 
                            existingProject?.additional_images?.map((img, index) => (
                                <img 
                                    key={`existing-${index}`}
                                    src={img.base64Image}
                                    alt={`Image ${index + 1}`}
                                    className="img-thumbnail"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Video</label>
                    <input
                        type="file"
                        name="Video"
                        onChange={handleFileChange}
                        accept="video/*"
                        className="form-control"
                    />
                    {existingProject?.Video && (
                        <div className="mt-2">
                            <video 
                                src={existingProject.Video}
                                controls
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Document</label>
                    <input
                        type="file"
                        name="Document"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="form-control"
                    />
                    {existingProject?.Document && (
                        <div className="mt-2">
                            <a 
                                href={existingProject.Document}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                            >
                                View Current Document
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
