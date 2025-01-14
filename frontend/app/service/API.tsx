import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

interface APIError {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
}

export const adminAPI = {
    login: async (email: string, password: string) => {
        try {
            const response = await API.post('/admin/login', { email, password });
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Login failed"
            };
        }
    },
    verifyToken: async () => {
        try {
            const response = await API.get('/admin/verify-token');
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.status === 401 ? 'Authentication required' : 'Verification failed'
            };
        }
    },
    createProject: async (formData: FormData) => {
        try {
            const response = await API.post('/admin/create-project', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Failed to create project"
            };
        }
    },
    getProjects: async () => {
        try {
            const response = await API.get('/projects');
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Failed to fetch projects"
            };
        }
    },
    getProjectById: async (id: string) => {
        try {
            const response = await API.get(`/projects/${id}`);
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Failed to fetch project details"
            };
        }
    },
    editProject: async (id: string, formData: FormData) => {
        try {
            const response = await API.put(`/admin/edit-project/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Failed to edit project"
            };
        }
    },
    deleteProject: async (id: string) => {
        try {
            const response = await API.delete(`/admin/delete-project/${id}`);
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Failed to delete project"
            };
        }
    }
};

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const contactAPI = {
    submit: async (formData: ContactFormData) => {
        try {
            const response = await API.post('/api/contact/submit', formData);
            return { success: true, data: response.data };
        } catch (error: unknown) {
            const apiError = error as APIError;
            return {
                success: false,
                error: apiError.response?.data?.message || "Failed to submit contact form"
            };
        }
    }
};

