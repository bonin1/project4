import React from 'react';
import Navbar from '../components/globalComponents/Navbar';
import Footer from '../components/globalComponents/Footer/Footer';
import ImageHeader from '../components/construction/imageHeader/imageHeader';
import ServiceDetails from '../components/construction/serviceDetails/ServiceDetails';
import StatsSection from '../components/construction/statsSection/StatsSection';
import ConstructionProjects from '../components/construction/projects/projects';

const construction = () => {
    return(
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <ServiceDetails />
                    <ConstructionProjects />
                    <StatsSection />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default construction;