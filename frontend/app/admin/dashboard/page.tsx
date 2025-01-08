'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { adminAPI } from '../../service/API';
import LoadingSpinner from '../components/dashboardComponents/LoadingSpinner';

const CreateProjectForm = dynamic(
    () => import('../components/dashboardComponents/CreateProjectForm'),
    { loading: () => <LoadingSpinner /> }
);

const DashboardSidebar = dynamic(
    () => import('../components/dashboardComponents/DashboardSidebar'),
    { loading: () => <LoadingSpinner /> }
);

const EditProjectList = dynamic(
    () => import('../components/dashboardComponents/EditProjectList'),
    { loading: () => <LoadingSpinner /> }
);

const DashboardPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const verifyAuth = async () => {
            try {
                const response = await adminAPI.verifyToken();
                if (!response.success) {
                    router.push('/admin');
                }
            } catch {
                router.push('/admin');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [router]);

    if (!mounted || isLoading) {
        return <LoadingSpinner />;
    }

    const renderComponent = () => {
        switch (activeComponent) {
            case 'createProject':
                return <CreateProjectForm />;
            case 'editProject':
                return <EditProjectList />;
            default:
                return (
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <h2 className="text-muted">Select an option from the sidebar</h2>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen d-flex">
            <DashboardSidebar 
                activeComponent={activeComponent} 
                setActiveComponent={setActiveComponent}
            />
            <div className="flex-grow-1 bg-light p-4">
                {renderComponent()}
            </div>
        </div>
    );
}

export default DashboardPage;
