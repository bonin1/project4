"use client";

import { useEffect, useState, use } from 'react';
import { adminAPI } from '../../service/API';
import ProjectCard from '../../components/projects/projectCard/projectCard';
import Navbar from '../../components/globalComponents/Navbar';

export default function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<{
        project: any;
        loading: boolean;
        error: string | null;
    }>({ 
        project: null, 
        loading: true, 
        error: null 
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await adminAPI.getProjectById(resolvedParams.id);
                if (response && response.success) {
                    setData({ 
                        project: response.data, 
                        loading: false, 
                        error: null 
                    });
                } else {
                    setData({ 
                        project: null, 
                        loading: false, 
                        error: response?.error || 'Failed to fetch project' 
                    });
                }
            } catch (error) {
                setData({ 
                    project: null, 
                    loading: false, 
                    error: 'Failed to fetch project details' 
                });
            }
        };

        fetchProject();
    }, [resolvedParams.id]);

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>{data.error}</div>;
    if (!data.project) return <div>Project not found</div>;

    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ProjectCard project={data.project} /> {/* removed semicolon */}
                </div>
            </main>
        </div>
    )
}
