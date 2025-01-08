import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const adminAPI = {
    login: async (email: string, password: string) => {
        try {
            const response = await API.post('/admin/login', { email, password });
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed"
            };
        }
    },
    verifyToken: async () => {
        try {
            const response = await API.get('/admin/verify-token');
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.status === 401 ? 'Authentication required' : 'Verification failed'
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
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Failed to create project"
            };
        }
    },
    getProjects: async () => {
        try {
            const response = await API.get('/projects');
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Failed to fetch projects"
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
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Failed to edit project"
            };
        }
    }
};

