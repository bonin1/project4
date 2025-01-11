import React from 'react';
import './companyOverview.scss';
import Image from 'next/image';

const CompanyOverview = () => {
    return (
        <div className="company-overview">
            <div className="hero-banner">
                <div className="content-layer">
                    <h1>Constructing Tomorrow's Legacy</h1>
                    <p>Excellence in Construction Since 1995</p>
                </div>
                <Image 
                    src="/construction-site.jpg" 
                    alt="Modern construction site" 
                    fill
                    className="banner-image"
                />
            </div>
        </div>
    );
};

export default CompanyOverview;