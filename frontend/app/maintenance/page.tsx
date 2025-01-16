import React from 'react';
import Navbar from '../components/globalComponents/Navbar';
import Footer from '../components/globalComponents/Footer/Footer';
import ImageHeader from '../components/maintenance/imageHeader/imageHeader';
import MaintenanceDetails from '../components/maintenance/serviceDetails/MaintenanceDetails';

const Maintenance = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <MaintenanceDetails />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Maintenance;
