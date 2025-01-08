'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '../../service/API';
import CreateProjectForm from '../components/dashboardComponents/CreateProjectForm';
import DashboardSidebar from '../components/dashboardComponents/DashboardSidebar';
import EditProjectList from '../components/dashboardComponents/EditProjectList';

const DashboardPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await adminAPI.verifyToken();
                if (!response.success) {
                    router.push('/admin');
                }
            } catch (error) {
                router.push('/admin');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
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
