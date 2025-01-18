import React from "react";
import dynamic from 'next/dynamic';
import ImageHeader from "../components/sustainability/imageHeader/imageHeader";
import SustainabilityContent from "../components/sustainability/sustainabilityContent/sustainabilityContent";
import Navbar from "../components/globalComponents/Navbar";
import Footer from "../components/globalComponents/Footer/Footer";

const Sustainable: React.FC = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <SustainabilityContent />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Sustainable;
