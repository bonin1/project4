'use client';
import React from 'react';

interface SidebarProps {
    activeComponent: string | null;
    setActiveComponent: (component: string | null) => void;
}

const DashboardSidebar = ({ activeComponent, setActiveComponent }: SidebarProps) => {
    const handleNavClick = (component: string) => {
        setActiveComponent(activeComponent === component ? null : component);
    };

    return (
        <div className="bg-dark text-white min-vh-100 p-3" style={{ width: '250px' }}>
            <h3 className="text-white p-3">Dashboard</h3>
            <div className="nav flex-column nav-pills">
                <button
                    className={`nav-link text-white d-flex align-items-center gap-2 ${activeComponent === 'createProject' ? 'active' : ''}`}
                    onClick={() => handleNavClick('createProject')}
                >
                    <i className="bi bi-plus-square"></i>
                    Create Project
                </button>
                <button
                    className={`nav-link text-white d-flex align-items-center gap-2 ${activeComponent === 'editProject' ? 'active' : ''}`}
                    onClick={() => handleNavClick('editProject')}
                >
                    <i className="bi bi-pencil-square"></i>
                    Edit Projects
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
