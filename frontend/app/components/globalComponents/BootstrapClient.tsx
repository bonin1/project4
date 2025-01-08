'use client';
import { useEffect } from 'react';

const BootstrapClient = () => {
    useEffect(() => {
        const loadBootstrap = async () => {
            try {
                await import('bootstrap/dist/js/bootstrap.bundle.min.js');
            } catch (error) {
                console.error('Failed to load Bootstrap:', error);
            }
        };
        loadBootstrap();
    }, []);

    return null;
};

export default BootstrapClient;
