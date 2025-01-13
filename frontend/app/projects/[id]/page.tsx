"use client";

import { useEffect, useState, use } from 'react';
import { adminAPI } from '../../service/API';
import ProjectCard from '../../components/projects/projectCard/projectCard';
import Navbar from '../../components/globalComponents/Navbar';

export default function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState({ 
        project: null, 
        loading: true, 
        error: null 
    });

    useEffect(() => {
        adminAPI.getProjectById(resolvedParams.id)
            .then(response => {
                if (response.success) {
                    setData({ project: response.data, loading: false, error: null });
                } else {
                    setData({ project: null, loading: false, error: response.error });
                }
            })
            .catch(() => {
                setData({ project: null, loading: false, error: 'Failed to fetch project details' });
            });
    }, [resolvedParams.id]);

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>{data.error}</div>;
    if (!data.project) return <div>Project not found</div>;

    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ProjectCard project={data.project} />;
                </div>
            </main>
        </div>
    )
}
