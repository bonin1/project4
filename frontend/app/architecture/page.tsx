import React from "react";
import Navbar from "../components/globalComponents/Navbar";
import Footer from "../components/globalComponents/Footer/Footer";
import ImageHeader from "../components/architecture/imageHeader/imageHeader";
import ServiceOverview from "../components/architecture/serviceOverview/serviceOverview";
import Projects from "../components/construction/projects/projects";
import DesignPhilosophy from "../components/architecture/designPhilosophy/designPhilosophy";

const architecture = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <ServiceOverview />
                    <DesignPhilosophy />
                    <Projects />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default architecture
