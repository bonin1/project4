export type ProjectStatus = 'Planned' | 'Ongoing' | 'Completed' | 'On Hold' | 'Cancelled';

export interface ProjectFormData {
    ProjectName: string;
    ProjectDescription: string;
    ClientName: string;
    StartDate: string;
    EndDate: string;
    Status: ProjectStatus | '';
    budget: string;
    Location: string;
    ProjectManager: string;
}

export interface FileState {
    primary_image: File | null;
    additional_images: File[];
    Video: File | null;
    Document: File | null;
}

export interface ImagePreviews {
    primary_image: string;
    additional_images: string[];
}

export interface Project extends Omit<ProjectFormData, 'budget'> {
    ProjectID: string;
    budget: number;
    primary_image: string | null;
    additional_images: { base64Image: string }[];
    Video: string | null;
    Document: string | null;
}
