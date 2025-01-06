'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '../../service/API';

const DashboardPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

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
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center mt-10">Dashboard</h1>
        </div>
    );
}

export default DashboardPage;
